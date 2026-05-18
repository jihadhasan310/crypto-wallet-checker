import type { AnalyzeResult, TokenTransaction } from "./types";
import { normalizeAddress } from "./validation";

/** Raw transfer row from Etherscan `tokentx` */
interface EtherscanTokenTx {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenSymbol: string;
  tokenDecimal: string;
}

interface EtherscanResponse {
  status: string;
  message: string;
  result: EtherscanTokenTx[] | string;
}

const ETHERSCAN_BASE = "https://api.etherscan.io/v2/api";
const CHAIN_ID = "1"; // Ethereum mainnet

function formatTokenAmount(rawValue: bigint, decimals: number): string {
  const negative = rawValue < 0n;
  const value = negative ? -rawValue : rawValue;
  const divisor = 10n ** BigInt(decimals);
  const whole = value / divisor;
  const fraction = value % divisor;

  let result: string;
  if (fraction === 0n) {
    result = whole.toString();
  } else {
    const fractionStr = fraction.toString().padStart(decimals, "0").replace(/0+$/, "");
    result = `${whole}.${fractionStr}`;
  }

  return negative ? `-${result}` : result;
}

function parseTransfers(
  rows: EtherscanTokenTx[],
  wallet: string
): {
  symbol: string;
  decimals: number;
  totalReceived: bigint;
  totalSent: bigint;
  transactions: TokenTransaction[];
} {
  const walletLower = normalizeAddress(wallet);
  let totalReceived = 0n;
  let totalSent = 0n;
  const transactions: TokenTransaction[] = [];

  const decimals = rows.length > 0 ? Number(rows[0].tokenDecimal) || 18 : 18;
  const symbol = rows.length > 0 ? rows[0].tokenSymbol || "TOKEN" : "TOKEN";

  for (const row of rows) {
    const value = BigInt(row.value);
    const from = normalizeAddress(row.from);
    const to = normalizeAddress(row.to);
    const timestamp = Number(row.timeStamp);

    if (to === walletLower) {
      totalReceived += value;
      transactions.push({
        hash: row.hash,
        timestamp,
        direction: "in",
        amount: formatTokenAmount(value, decimals),
        amountRaw: row.value,
        from: row.from,
        to: row.to,
        blockNumber: row.blockNumber,
      });
    }

    if (from === walletLower) {
      totalSent += value;
      transactions.push({
        hash: row.hash,
        timestamp,
        direction: "out",
        amount: formatTokenAmount(value, decimals),
        amountRaw: row.value,
        from: row.from,
        to: row.to,
        blockNumber: row.blockNumber,
      });
    }
  }

  // Newest first
  transactions.sort((a, b) => b.timestamp - a.timestamp);

  return { symbol, decimals, totalReceived, totalSent, transactions };
}

export async function fetchTokenTransfers(
  wallet: string,
  tokenContract: string,
  apiKey: string
): Promise<AnalyzeResult> {
  const params = new URLSearchParams({
    chainid: CHAIN_ID,
    module: "account",
    action: "tokentx",
    address: wallet,
    contractaddress: tokenContract,
    page: "1",
    offset: "10000",
    sort: "asc",
    apikey: apiKey,
  });

  const url = `${ETHERSCAN_BASE}?${params.toString()}`;
  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`Etherscan request failed (${response.status})`);
  }

  const data: EtherscanResponse = await response.json();

  if (data.status !== "1") {
    const msg =
      typeof data.result === "string"
        ? data.result
        : data.message || "No transfers found for this wallet and token.";
    throw new Error(msg === "No transactions found" ? "No token transfers found for this wallet and token." : msg);
  }

  const rows = data.result as EtherscanTokenTx[];

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("No token transfers found for this wallet and token.");
  }

  const { symbol, decimals, totalReceived, totalSent, transactions } =
    parseTransfers(rows, wallet);

  const net = totalReceived - totalSent;

  return {
    wallet,
    tokenContract,
    tokenSymbol: symbol,
    tokenDecimals: decimals,
    totalReceived: formatTokenAmount(totalReceived, decimals),
    totalSent: formatTokenAmount(totalSent, decimals),
    netBalance: formatTokenAmount(net, decimals),
    transactionCount: transactions.length,
    transactions,
  };
}
