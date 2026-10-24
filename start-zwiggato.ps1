$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $repoRoot 'zwiggato-backend'
$frontendDir = Join-Path $repoRoot 'zwiggato-frontend'

Write-Host "Starting Zwiggato backend and frontend from repository root: $repoRoot" -ForegroundColor Cyan

# Backend window
Start-Process powershell -ArgumentList @(
    '-NoExit',
    '-Command',
    "Set-Location -LiteralPath '$backendDir'; mvn -DskipTests package; java -jar target/backend-0.0.1-SNAPSHOT.jar"
)

# Frontend window
Start-Process powershell -ArgumentList @(
    '-NoExit',
    '-Command',
    "Set-Location -LiteralPath '$frontendDir'; if (-Not (Test-Path -LiteralPath 'node_modules')) { npm install }; npm run dev -- --host 127.0.0.1 --port 5173"
)

Write-Host "Backend will run on http://127.0.0.1:8080" -ForegroundColor Green
Write-Host "Frontend will run on http://127.0.0.1:5173" -ForegroundColor Green
