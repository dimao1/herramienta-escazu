# Script de PowerShell para configurar la base de datos local
# Herramienta de Autodiagnóstico - Ruta de Escazú 567

Write-Host "🐳 Configurando Base de Datos Local con Docker Compose" -ForegroundColor Green
Write-Host ""

# Verificar que Docker está instalado
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker encontrado: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "Por favor instala Docker Desktop desde: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    exit 1
}

# Verificar que Docker está ejecutándose
try {
    docker ps | Out-Null
    Write-Host "✅ Docker Desktop está ejecutándose" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Desktop no está ejecutándose" -ForegroundColor Red
    Write-Host "Por favor inicia Docker Desktop e intenta de nuevo" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 Iniciando contenedor de PostgreSQL..." -ForegroundColor Cyan

# Iniciar Docker Compose
docker compose up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Contenedor iniciado exitosamente" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "⏳ Esperando a que PostgreSQL esté listo..." -ForegroundColor Cyan
    Start-Sleep -Seconds 5
    
    # Verificar estado
    Write-Host ""
    Write-Host "📊 Estado del contenedor:" -ForegroundColor Cyan
    docker compose ps
    
    Write-Host ""
    Write-Host "✅ ¡Base de datos configurada exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Información de conexión:" -ForegroundColor Yellow
    Write-Host "   Usuario: escazu_user" -ForegroundColor White
    Write-Host "   Contraseña: escazu_password_2024" -ForegroundColor White
    Write-Host "   Base de datos: herramienta_escazu" -ForegroundColor White
    Write-Host "   Puerto: 5432" -ForegroundColor White
    Write-Host "   Host: localhost" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 Cadena de conexión:" -ForegroundColor Yellow
    Write-Host "   postgresql://escazu_user:escazu_password_2024@localhost:5432/herramienta_escazu" -ForegroundColor White
    Write-Host ""
    Write-Host "🚀 Comandos útiles:" -ForegroundColor Cyan
    Write-Host "   Ver logs:        docker compose logs -f" -ForegroundColor White
    Write-Host "   Detener:         docker compose down" -ForegroundColor White
    Write-Host "   Reiniciar:       docker compose restart" -ForegroundColor White
    Write-Host "   Conectar a DB:   docker compose exec postgres psql -U escazu_user -d herramienta_escazu" -ForegroundColor White
    Write-Host ""
    Write-Host "▶️  Ahora puedes ejecutar:" -ForegroundColor Green
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Error al iniciar el contenedor" -ForegroundColor Red
    Write-Host "Revisa los logs con: docker compose logs" -ForegroundColor Yellow
    exit 1
}
