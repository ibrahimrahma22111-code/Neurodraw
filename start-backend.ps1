# Run from project root: .\start-backend.ps1
Set-Location $PSScriptRoot\backend

# Stop stray backends on 3000/3001
Get-NetTCPConnection -LocalPort 3000,3001 -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }

if (-not (Test-Path ".\.venv\Scripts\uvicorn.exe")) {
    Write-Host "Setting up Python venv..."
    py -3.11 -m venv .venv
    .\.venv\Scripts\pip install -r requirements.txt
}

Write-Host "Starting API on http://localhost:3001"
.\.venv\Scripts\uvicorn.exe main:app --reload --port 3001
