import { getChain, getTxExplorerUrl } from "@/lib/chains";
import type { TokenTransaction } from "@/lib/types";

interface TransactionListProps {
  transactions: TokenTransaction[];
  tokenSymbol: string;
  chainSlug: string;
}

function formatTo4Decimals(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num.toFixed(4);
}

function shortenAddress(addr: string): string {
  if (addr.length < 12) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function TransactionList({
  transactions,
  tokenSymbol,
  chainSlug,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return null;
  }

  const chain = getChain(chainSlug);

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20">
      <h2 className="mb-4 text-lg font-semibold text-white">Transaction history</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-slate-500">
              <th className="pb-3 pr-4 font-medium">Date</th>
              <th className="pb-3 pr-4 font-medium">Type</th>
              <th className="pb-3 pr-4 font-medium">Amount</th>
              <th className="pb-3 pr-4 font-medium">From</th>
              <th className="pb-3 pr-4 font-medium">To</th>
              <th className="pb-3 font-medium">Tx</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={`${tx.hash}-${tx.direction}`}
                className="border-b border-[var(--border)]/60 last:border-0"
              >
                <td className="py-3 pr-4 whitespace-nowrap text-slate-300">
                  {formatDate(tx.timestamp)}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={
                      tx.direction === "in"
                        ? "rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-medium text-[var(--success)]"
                        : "rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-medium text-[var(--danger)]"
                    }
                  >
                    {tx.direction === "in" ? "IN" : "OUT"}
                  </span>
                </td>
                <td
                  className={`py-3 pr-4 font-mono tabular-nums ${
                    tx.direction === "in" ? "text-[var(--success)]" : "text-[var(--danger)]"
                  }`}
                >
                  {tx.direction === "in" ? "+" : "−"}
                  {formatTo4Decimals(tx.amount)} {tokenSymbol}
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-slate-400">
                  {shortenAddress(tx.from)}
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-slate-400">
                  {shortenAddress(tx.to)}
                </td>
                <td className="py-3">
                  {chain ? (
                    <a
                      href={getTxExplorerUrl(chain, tx.hash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--accent)] hover:underline"
                    >
                      {shortenAddress(tx.hash)}
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-slate-400">
                      {shortenAddress(tx.hash)}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
