"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import WalletForm from "@/components/WalletForm";
import ResultsDashboard from "@/components/ResultsDashboard";
import TransactionList from "@/components/TransactionList";
import DonationFooter from "@/components/DonationFooter";
import { DEFAULT_CHAIN, getChain, type ChainSlug } from "@/lib/chains";
import type { AnalyzeResult } from "@/lib/types";

function parseChainSlug(value: string | null): ChainSlug {
  const chain = getChain(value);
  return chain?.slug ?? DEFAULT_CHAIN;
}

export default function HomeClient() {
  const searchParams = useSearchParams();
  const initialLoadDone = useRef(false);

  const [chain, setChain] = useState<ChainSlug>(DEFAULT_CHAIN);
  const [wallet, setWallet] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyzeResult | null>(null);
  const [copied, setCopied] = useState(false);

  const analyze = useCallback(
    async (walletAddr: string, tokenAddr: string, chainSlug: ChainSlug) => {
      setLoading(true);
      setError(null);
      setData(null);

      const params = new URLSearchParams({
        wallet: walletAddr.trim(),
        token: tokenAddr.trim(),
        chain: chainSlug,
      });

      try {
        const res = await fetch(`/api/analyze?${params.toString()}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json.error ?? "Something went wrong.");
          return;
        }

        setData(json as AnalyzeResult);

        const url = new URL(window.location.href);
        url.searchParams.set("wallet", walletAddr.trim());
        url.searchParams.set("token", tokenAddr.trim());
        url.searchParams.set("chain", chainSlug);
        window.history.replaceState({}, "", url.toString());
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    const w = searchParams.get("wallet");
    const t = searchParams.get("token");
    const c = parseChainSlug(searchParams.get("chain"));
    setChain(c);
    if (w) setWallet(w);
    if (t) setToken(t);
    if (w && t) {
      void analyze(w, t, c);
    }
  }, [searchParams, analyze]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void analyze(wallet, token, chain);
  }

  function handleChainChange(nextChain: ChainSlug) {
    const prev = getChain(chain);
    const next = getChain(nextChain);
    setChain(nextChain);
    setData(null);
    setError(null);
    if (next && (!token.trim() || (prev && token === prev.sampleToken))) {
      setToken(next.sampleToken);
    }
  }

  async function copyShareLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
          Ethereum · Polygon · ERC-20
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Crypto Wallet Profit Checker
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Paste a wallet and token contract to see total received, total sent, net balance, and
          transfer history. No login. Powered by Etherscan.
        </p>
      </header>

      <WalletForm
        chain={chain}
        wallet={wallet}
        token={token}
        loading={loading}
        onChainChange={handleChainChange}
        onWalletChange={setWallet}
        onTokenChange={setToken}
        onSubmit={handleSubmit}
      />

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </div>
      )}

      {data && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => void copyShareLink()}
              className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-[var(--accent)] hover:text-white"
            >
              {copied ? "Link copied!" : "Copy share link"}
            </button>
          </div>
          <ResultsDashboard data={data} />
          <TransactionList
            transactions={data.transactions}
            tokenSymbol={data.tokenSymbol}
            chainSlug={data.chainSlug}
          />
        </div>
      )}

      <DonationFooter />

      <footer className="mt-8 text-center text-xs text-slate-600">
        Data from Etherscan · Ethereum & Polygon · Free tier API
      </footer>
    </main>
  );
}
