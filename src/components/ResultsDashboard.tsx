import type { AnalyzeResult } from "@/lib/types";

interface ResultsDashboardProps {
  data: AnalyzeResult;
}

function StatCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "default" | "in" | "out" | "net";
}) {
  const toneClass = {
    default: "text-white",
    in: "text-[var(--success)]",
    out: "text-[var(--danger)]",
    net: "text-[var(--accent)]",
  }[tone];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[#0b0f19]/60 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${toneClass}`}>
        {value} <span className="text-base font-semibold text-slate-400">{sub}</span>
      </p>
    </div>
  );
}

function formatTo4Decimals(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num.toFixed(4);
}

export default function ResultsDashboard({ data }: ResultsDashboardProps) {
  const netNum = parseFloat(data.netBalance);
  const netTone = netNum >= 0 ? "in" : "out";

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">Results</h2>
          <p className="text-sm text-slate-400">
            {data.transactionCount} transfer{data.transactionCount === 1 ? "" : "s"} for{" "}
            <span className="font-mono text-slate-300">{data.tokenSymbol}</span> on{" "}
            <span className="text-slate-300">{data.chainName}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total received"
          value={formatTo4Decimals(data.totalReceived)}
          sub={data.tokenSymbol}
          tone="in"
        />
        <StatCard
          label="Total sent"
          value={formatTo4Decimals(data.totalSent)}
          sub={data.tokenSymbol}
          tone="out"
        />
        <StatCard
          label="Net balance"
          value={formatTo4Decimals(data.netBalance)}
          sub={data.tokenSymbol}
          tone={netTone === "in" ? "net" : "out"}
        />
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Net = total received − total sent (transfer history only, not current on-chain balance).
      </p>

    </section>
  );
}
