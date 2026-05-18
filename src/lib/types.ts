export type TransactionDirection = "in" | "out";

export interface TokenTransaction {
  hash: string;
  timestamp: number;
  direction: TransactionDirection;
  amount: string;
  amountRaw: string;
  from: string;
  to: string;
  blockNumber: string;
}

export interface AnalyzeResult {
  wallet: string;
  tokenContract: string;
  tokenSymbol: string;
  tokenDecimals: number;
  totalReceived: string;
  totalSent: string;
  netBalance: string;
  transactionCount: number;
  transactions: TokenTransaction[];
}

export interface AnalyzeError {
  error: string;
}
