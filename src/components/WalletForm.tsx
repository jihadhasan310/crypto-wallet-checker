"use client";

interface WalletFormProps {
  wallet: string;
  token: string;
  loading: boolean;
  onWalletChange: (value: string) => void;
  onTokenChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function WalletForm({
  wallet,
  token,
  loading,
  onWalletChange,
  onTokenChange,
  onSubmit,
}: WalletFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl shadow-black/20"
    >
      <div className="space-y-4">
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
            placeholder="0xdAC17F958D2ee523a2206206994597C13D831ec7"
            className="w-full rounded-lg border border-[var(--border)] bg-[#0b0f19] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            required
            autoComplete="off"
            spellCheck={false}
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Example: USDT on Ethereum mainnet — 0xdAC17F958D2ee523a2206206994597C13D831ec7
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
