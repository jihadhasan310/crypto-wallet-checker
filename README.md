# Crypto Wallet Profit Checker

Simple web app to analyze **ERC-20 token transfers** for any Ethereum wallet.

- Total tokens received (inflows)
- Total tokens sent (outflows)
- Net balance (received − sent)
- Transaction history table

**Stack:** Next.js 15 · Tailwind CSS · Etherscan API (free) · Vercel (free)

No database. No login.

---

## Project structure

```
crypto-wallet-checker/
├── src/
│   ├── app/
│   │   ├── api/analyze/route.ts   # Server API → Etherscan
│   │   ├── HomeClient.tsx         # Main UI (client)
│   │   ├── page.tsx               # Page + Suspense wrapper
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── WalletForm.tsx
│   │   ├── ResultsDashboard.tsx
│   │   └── TransactionList.tsx
│   └── lib/
│       ├── etherscan.ts           # Fetch & calculate transfers
│       ├── validation.ts
│       └── types.ts
├── .env.example
├── package.json
└── README.md
```

---

## Prerequisites

1. **Node.js 18+** — [https://nodejs.org](https://nodejs.org)
2. **Etherscan API key (free)** — [https://etherscan.io/myapikey](https://etherscan.io/myapikey)

---

## Run locally

```bash
cd crypto-wallet-checker
npm install
```

Create `.env.local`:

```env
ETHERSCAN_API_KEY=your_key_here
```

Start dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build test:

```bash
npm run build
npm start
```

---

## Shareable links

After analysis, the URL updates with query params:

```
https://your-app.vercel.app/?wallet=0x...&token=0x...
```

Anyone opening that link auto-runs the same analysis.

---

## Deploy to Vercel (FREE)

### Step 1 — Push to GitHub

1. Create a repo on [GitHub](https://github.com/new) (e.g. `crypto-wallet-checker`).
2. In the project folder:

```bash
git init
git add .
git commit -m "Initial commit: crypto wallet profit checker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crypto-wallet-checker.git
git push -u origin main
```

### Step 2 — Connect Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign up (free) with GitHub.
2. Click **Add New → Project**.
3. Import your `crypto-wallet-checker` repository.
4. Vercel auto-detects **Next.js** — keep default settings:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output: (default)

### Step 3 — Environment variable

Before deploying, open **Environment Variables** and add:

| Name | Value |
|------|--------|
| `ETHERSCAN_API_KEY` | Your Etherscan API key |

Apply to **Production**, **Preview**, and **Development**.

Click **Deploy**.

### Step 4 — Live URL

After ~1–2 minutes you get a URL like:

```
https://crypto-wallet-checker.vercel.app
```

Optional: add a custom domain in Vercel → Project → Settings → Domains.

### Step 5 — Verify production

1. Open your live URL.
2. Enter a wallet with known ERC-20 activity.
3. Use USDT contract: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
4. Click **Analyze Wallet** — results and history should load.

If you see *"Server missing ETHERSCAN_API_KEY"*, add the variable in Vercel and **Redeploy**.

---

## API limits (free tier)

- Etherscan free: ~5 calls/second, 100,000 calls/day.
- Fetches up to **10,000** transfers per wallet+token.
- **Ethereum mainnet only** (chain id `1`).

---

## License

MIT — use freely for learning and demos.
