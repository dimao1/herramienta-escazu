@echo off
echo ========================================
echo INICIAR SERVIDOR LOCAL
echo ========================================
echo.

echo 1. Instalando dependencias...
call npm install
echo.

echo 2. Generando cliente Prisma...
call npx prisma generate
echo.

echo 3. Iniciando servidor de desarrollo...
echo.
echo La aplicacion estara disponible en:
echo http://localhost:3000
echo.
echo Panel admin en:
echo http://localhost:3000/admin
echo.
call npm run dev
