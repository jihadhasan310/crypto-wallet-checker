import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_CHAIN, getChain } from "@/lib/chains";
import { fetchTokenTransfers } from "@/lib/etherscan";
import { isValidEthAddress } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const wallet = request.nextUrl.searchParams.get("wallet")?.trim() ?? "";
  const token = request.nextUrl.searchParams.get("token")?.trim() ?? "";
  const chainSlug = request.nextUrl.searchParams.get("chain")?.trim() || DEFAULT_CHAIN;

  const chain = getChain(chainSlug);
  if (!chain) {
    return NextResponse.json(
      { error: "Unsupported chain. Use ethereum or polygon." },
      { status: 400 }
    );
  }

  if (!wallet || !token) {
    return NextResponse.json(
      { error: "Both wallet and token contract addresses are required." },
      { status: 400 }
    );
  }

  if (!isValidEthAddress(wallet) || !isValidEthAddress(token)) {
    return NextResponse.json(
      { error: "Invalid address. Use a 0x-prefixed 40-character hex address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ETHERSCAN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server missing ETHERSCAN_API_KEY. Add it in .env.local or Vercel settings." },
      { status: 500 }
    );
  }

  try {
    const result = await fetchTokenTransfers(wallet, token, apiKey, chain);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch blockchain data.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
