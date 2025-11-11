# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar la herramienta de diagnóstico en Vercel usando Neon Database.

## 📋 Prerequisitos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Neon](https://neon.tech) (ya configurada)
- Variables de entorno en `.env.vercel`

## 🔧 Configuración Inicial

### 1. Inicializar la Base de Datos Neon

#### Paso 1: Crear las tablas en Neon

```bash
# Probar conexión a Neon
npm run neon:test

# Crear tablas (esto ejecuta init.sql en Neon)
npm run neon:init
```

#### Paso 2: Copiar datos desde local a Neon

```bash
# Asegúrate de que Docker esté corriendo
npm run db:start

# Poblar base de datos local (si no lo has hecho)
npm run db:seed

# Copiar todos los datos de local a Neon
npm run neon:copy
```

**Nota**: Este proceso creará:
- ✅ Todas las tablas necesarias
- ✅ 3 módulos del diagnóstico (o los que tengas en local)
- ✅ 39 preguntas con sus recomendaciones
- ✅ 5 opciones de respuesta estándar
- ✅ Usuario admin por defecto (admin/admin123)

### 2. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables desde `.env.vercel`:

```bash
DATABASE_URL=tu_url_de_neon_aqui
```

**Importante**: Solo necesitas `DATABASE_URL`. Las demás variables son opcionales.

### 3. Desplegar a Vercel

#### Opción A: Deploy desde Git (Recomendado)

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Click en **Deploy**

#### Opción B: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 🔄 Diferencias entre Local y Producción

### Desarrollo Local (Docker)
```bash
# Usa PostgreSQL en Docker
DATABASE_URL=postgresql://escazu_user:escazu_password_2024@localhost:5432/herramienta_escazu

# Iniciar base de datos local
docker compose up -d

# Poblar datos locales
node scripts/seed-database.js

# Iniciar desarrollo
npm run dev
```

### Producción (Vercel + Neon)
```bash
# Usa Neon Database en la nube
DATABASE_URL=postgresql://...@....neon.tech/neondb?sslmode=require

# Las variables se configuran en Vercel Dashboard
# El código usa automáticamente process.env.DATABASE_URL
```

## 🛠️ Scripts Útiles

```bash
# Probar conexión local
node test-db-connection.js

# Probar conexión Neon
node scripts/test-neon-connection.js

# Inicializar Neon (solo una vez)
node scripts/init-neon-db.js

# Poblar datos locales
node scripts/seed-database.js
```

## ✅ Verificación Post-Despliegue

1. **Verificar que el sitio carga**: Visita tu URL de Vercel
2. **Probar la herramienta**: Completa una evaluación
3. **Verificar admin panel**: 
   - Ve a `/admin`
   - Login con: `admin` / `admin123`
   - Verifica que veas las estadísticas

## 🔐 Seguridad - Cambiar Contraseña de Admin

**⚠️ IMPORTANTE**: Después del primer despliegue, cambia la contraseña del admin:

1. Conéctate a tu base de datos Neon
2. Ejecuta:
```sql
UPDATE admins 
SET password_hash = 'tu_nueva_contraseña_segura' 
WHERE username = 'admin';
```

**Nota para producción**: Implementa bcrypt para hashear contraseñas (actualmente usa texto plano por simplicidad).

## 📊 Monitoreo

- **Vercel Dashboard**: Ver logs y métricas
- **Neon Console**: Monitorear queries y uso de BD
- **Admin Panel**: Ver estadísticas de uso

## 🐛 Troubleshooting

### Error: "Internal Server Error"
- Verifica que `DATABASE_URL` esté configurada en Vercel
- Revisa los logs en Vercel Dashboard
- Verifica que la BD Neon esté inicializada

### Error: "Cannot connect to database"
- Verifica que la URL de Neon sea correcta
- Asegúrate de que incluye `?sslmode=require`
- Prueba la conexión con `scripts/test-neon-connection.js`

### Datos no aparecen
- Ejecuta `node scripts/init-neon-db.js` para poblar la BD
- Verifica que las tablas existan en Neon Console

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica las tablas en Neon Console
3. Prueba las conexiones con los scripts de test

## 🎉 ¡Listo!

Tu herramienta de diagnóstico ahora está desplegada en Vercel con Neon Database.
