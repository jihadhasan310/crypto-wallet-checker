import { Suspense } from "react";
import HomeClient from "./HomeClient";

function LoadingFallback() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4">
      <p className="text-slate-400">Loading…</p>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeClient />
    </Suspense>
  );
}
