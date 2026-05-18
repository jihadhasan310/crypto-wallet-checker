# Run: .\scripts\set-etherscan-key.ps1
# Get a free key at https://etherscan.io/myapikey

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$key = Read-Host "Paste your ETHERSCAN_API_KEY"
if ([string]::IsNullOrWhiteSpace($key)) {
    Write-Host "No key entered. Cancelled." -ForegroundColor Red
    exit 1
}

$envPath = Join-Path $root ".env.local"
$lines = @()
if (Test-Path $envPath) {
    $lines = Get-Content $envPath | Where-Object { $_ -notmatch '^\s*ETHERSCAN_API_KEY=' }
}
$lines += "ETHERSCAN_API_KEY=$key"
$lines | Set-Content $envPath -Encoding utf8
Write-Host "Updated .env.local" -ForegroundColor Green

foreach ($env in @("production", "preview", "development")) {
    npx vercel env add ETHERSCAN_API_KEY $env --value $key --yes --force 2>&1 | Out-Host
}

Write-Host "Redeploying to Vercel..." -ForegroundColor Cyan
npx vercel --prod --yes 2>&1 | Select-Object -Last 8
Write-Host "Done. Test: https://crypto-wallet-checker-omega.vercel.app" -ForegroundColor Green
