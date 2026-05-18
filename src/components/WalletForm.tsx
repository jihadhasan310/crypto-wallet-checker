"use client";

import { CHAIN_LIST, type ChainSlug } from "@/lib/chains";

interface WalletFormProps {
  chain: ChainSlug;
  wallet: string;
  token: string;
  loading: boolean;
  onChainChange: (value: ChainSlug) => void;
  onWalletChange: (value: string) => void;
  onTokenChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function WalletForm({
  chain,
  wallet,
  token,
  loading,
  onChainChange,
  onWalletChange,
  onTokenChange,
  onSubmit,
}: WalletFormProps) {
  const chainConfig = CHAIN_LIST.find((c) => c.slug === chain) ?? CHAIN_LIST[0];

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="chain" className="mb-1.5 block text-sm font-medium text-slate-300">
            Blockchain
          </label>
          <select
            id="chain"
            value={chain}
            onChange={(e) => onChainChange(e.target.value as ChainSlug)}
            className="w-full rounded-lg border border-[var(--border)] bg-[#0b0f19] px-4 py-3 text-sm text-white focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
          >
            {CHAIN_LIST.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="wallet" className="mb-1.5 block text-sm font-medium text-slate-300">
            Wallet address
          </label>
          <input
            id="wallet"
            type="text"
            value={wallet}
            onChange={(e) => onWalletChange(e.target.value)}
            placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
            className="w-full rounded-lg border border-[var(--border)] bg-[#0b0f19] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            required
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div>
          <label htmlFor="token" className="mb-1.5 block text-sm font-medium text-slate-300">
            Token contract address
          </label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={(e) => onTokenChange(e.target.value)}
            placeholder={chainConfig.sampleToken}
            className="w-full rounded-lg border border-[var(--border)] bg-[#0b0f19] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            required
            autoComplete="off"
            spellCheck={false}
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Example: {chainConfig.sampleLabel} on {chainConfig.name} — {chainConfig.sampleToken}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Analyzing…" : "Analyze Wallet"}
      </button>
    </form>
  );
}
