# One-time setup, then deploy to Vercel (free)
# Run from project root: .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not (Test-Path ".env.local")) {
    Write-Host "Create .env.local with ETHERSCAN_API_KEY first (copy from .env.example)" -ForegroundColor Yellow
    exit 1
}

Write-Host "1. GitHub login (browser)..." -ForegroundColor Cyan
gh auth login

Write-Host "2. Create GitHub repo and push..." -ForegroundColor Cyan
$repoName = "crypto-wallet-checker"
gh repo create $repoName --public --source=. --remote=origin --push

Write-Host "3. Vercel login and deploy..." -ForegroundColor Cyan
npx vercel login
npx vercel env add ETHERSCAN_API_KEY production
npx vercel --prod

Write-Host "Done! Open the URL shown above." -ForegroundColor Green
