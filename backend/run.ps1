# Start NeuroDraw API on port 3000
$python = "C:\Users\Al-Huda\AppData\Local\Programs\Python\Python311\python.exe"
if (-not (Test-Path ".\.venv")) {
    & $python -m venv .venv
    .\.venv\Scripts\pip install -r requirements.txt
}
Set-Location $PSScriptRoot
.\.venv\Scripts\uvicorn main:app --reload --port 3000
