"use client";

import { useState } from "react";
import { DONATION_ENABLED, DONATION_WALLET } from "@/lib/site";

export default function DonationFooter() {
  const [copied, setCopied] = useState(false);

  if (!DONATION_ENABLED) {
    return null;
  }

  async function copyAddress() {
    await navigator.clipboard.writeText(DONATION_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)]/80 p-5 text-center">
      <p className="text-sm font-medium text-slate-300">Support this project</p>
      <p className="mt-1 text-xs text-slate-500">
        Send ETH or any ERC-20 token on Ethereum mainnet
      </p>
      <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
        <code className="break-all rounded-lg bg-[#0b0f19] px-3 py-2 font-mono text-xs text-slate-300 sm:text-sm">
          {DONATION_WALLET}
        </code>
        <button
          type="button"
          onClick={() => void copyAddress()}
          className="shrink-0 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-[var(--accent)] hover:text-white"
        >
          {copied ? "Copied!" : "Copy address"}
        </button>
      </div>
      <a
        href={`https://etherscan.io/address/${DONATION_WALLET}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-xs text-[var(--accent)] hover:underline"
      >
        View on Etherscan
      </a>
    </section>
  );
}
