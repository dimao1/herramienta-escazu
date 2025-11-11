# Script para aplicar migraciones y seed a Neon
$ErrorActionPreference = "Stop"

Write-Host "Aplicando migraciones y seed a Neon..." -ForegroundColor Cyan

# Leer DATABASE_URL de .env.vercel
$envContent = Get-Content .env.vercel
$dbUrlLine = $envContent | Where-Object { $_ -match 'DATABASE_URL=' } | Select-Object -First 1
$dbUrl = $dbUrlLine -replace 'DATABASE_URL="', '' -replace '"', ''

if (-not $dbUrl) {
    Write-Host "ERROR: No se encontro DATABASE_URL en .env.vercel" -ForegroundColor Red
    exit 1
}

$env:DATABASE_URL = $dbUrl
Write-Host "OK: DATABASE_URL configurada" -ForegroundColor Green

# Sincronizar schema (db push)
Write-Host "`nSincronizando schema..." -ForegroundColor Yellow
npx prisma db push --accept-data-loss

if ($LASTEXITCODE -eq 0) {
    Write-Host "OK: Schema sincronizado" -ForegroundColor Green
} else {
    Write-Host "ERROR: Fallo al sincronizar schema" -ForegroundColor Red
    exit 1
}

# Ejecutar seed
Write-Host "`nEjecutando seed..." -ForegroundColor Yellow
npx prisma db seed

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nOK: Seed completado exitosamente!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Fallo al ejecutar seed" -ForegroundColor Red
    exit 1
}

Write-Host "`nTodo listo! Base de datos Neon configurada." -ForegroundColor Cyan
