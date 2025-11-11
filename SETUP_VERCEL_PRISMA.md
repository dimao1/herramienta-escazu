# Setup de Prisma en Vercel

## 🚀 Pasos para configurar Prisma en Vercel

### 1. Variables de Entorno en Vercel

Asegúrate de tener configurada en Vercel:
- `DATABASE_URL` → Tu URL de conexión a Neon con pooling

### 2. Aplicar Migraciones a Neon

**Desde tu máquina local**, ejecuta:

```bash
# Configurar DATABASE_URL para apuntar a Neon
export DATABASE_URL="tu_neon_url_aqui"

# O en Windows PowerShell:
$env:DATABASE_URL="tu_neon_url_aqui"

# Aplicar migraciones
npx prisma migrate deploy

# Ejecutar seed
npx prisma db seed
```

### 3. O usando el archivo .env.vercel:

```bash
# En Windows PowerShell:
$env:DATABASE_URL=(Get-Content .env.vercel | Select-String "DATABASE_URL" | ForEach-Object { $_ -replace 'DATABASE_URL="', '' -replace '"', '' })
npx prisma migrate deploy
npx prisma db seed
```

## 📦 Lo que Vercel hace automáticamente:

1. **`npm install`** → Instala dependencias (incluido Prisma)
2. **`postinstall`** → Ejecuta `prisma generate` automáticamente
3. **`npm run build`** → Compila la aplicación Next.js

## ✅ Verificación

Después de desplegar:

1. Ve a: `https://tu-app.vercel.app/api/health`
2. Deberías ver: `"database": "Neon Database (Serverless)"`
3. Si ves errores de tablas faltantes, ejecuta las migraciones manualmente

## 🔧 Comandos Útiles

```bash
# Ver estado de migraciones
npx prisma migrate status

# Aplicar migraciones pendientes
npx prisma migrate deploy

# Ejecutar seed manualmente
npx prisma db seed

# Abrir Prisma Studio (GUI para ver/editar datos)
npx prisma studio
```

## 🐛 Troubleshooting

### Error: "Table doesn't exist"
```bash
# Aplicar migraciones a Neon
DATABASE_URL="tu_neon_url" npx prisma migrate deploy
```

### Error: "No data in database"
```bash
# Ejecutar seed
DATABASE_URL="tu_neon_url" npx prisma db seed
```

### Ver datos en Neon Console
1. Ve a https://console.neon.tech
2. Selecciona tu proyecto
3. SQL Editor → Ejecuta `SELECT * FROM modules;`
