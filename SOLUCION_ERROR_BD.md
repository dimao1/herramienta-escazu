# 🔧 Solución al Error de Base de Datos

## ❌ Error: "Error al guardar: {}"

Este error ocurre cuando la aplicación no puede guardar los datos en la base de datos PostgreSQL.

## 🔍 Diagnóstico Rápido

Abre tu navegador en: **http://localhost:3000/api/health**

Verás el estado de tu base de datos.

---

## ✅ SOLUCIÓN PASO A PASO

### **1. Verificar que Docker Desktop está ejecutándose**

**Windows:**
```powershell
# Verificar que Docker está corriendo
docker --version

# Ver contenedores activos
docker ps
```

**Si Docker no está instalado:**
- Descarga e instala: https://www.docker.com/products/docker-desktop/
- Reinicia tu computadora después de instalarlo

**Si Docker está instalado pero no corre:**
- Abre Docker Desktop desde el menú de inicio
- Espera a que el ícono de la ballena en la barra de tareas deje de animarse

---

### **2. Iniciar la Base de Datos PostgreSQL**

```powershell
# Opción 1: Usando npm (Recomendado)
npm run db:start

# Opción 2: Usando Docker Compose directamente
docker compose up -d

# Opción 3: Usando el script de PowerShell
.\scripts\setup-local-db.ps1
```

**Espera unos 5-10 segundos** para que PostgreSQL termine de iniciar.

---

### **3. Verificar que el Contenedor está Corriendo**

```powershell
docker compose ps
```

**Deberías ver:**
```
NAME                    STATUS
herramienta-escazu-db   Up
```

**Si el STATUS dice "Exited" o no aparece:**
```powershell
# Ver los logs para identificar el problema
docker compose logs postgres

# Reiniciar el contenedor
docker compose restart

# O recrearlo desde cero
docker compose down -v
docker compose up -d
```

---

### **4. Verificar la Conexión**

```powershell
# Conectarse a la base de datos
npm run db:connect

# O con Docker directamente
docker compose exec postgres psql -U escazu_user -d herramienta_escazu
```

**Deberías ver:**
```
psql (15.x)
herramienta_escazu=#
```

**Dentro de psql, ejecuta:**
```sql
\dt
```

**Deberías ver 7 tablas:**
- admins
- assessments
- modules
- questions
- response_options
- responses
- users

**Para salir de psql:**
```sql
\q
```

---

### **5. Verificar el Archivo .env.local**

Abre el archivo `.env.local` en la raíz del proyecto:

```bash
# Debe contener:
DATABASE_URL=postgresql://escazu_user:escazu_password_2024@localhost:5432/herramienta_escazu
```

**SI NO EXISTE el archivo `.env.local`:**
```powershell
# Crear desde el ejemplo
cp .env.example .env.local
```

**SI TIENE valores "placeholder":**
- Reemplázalo con la cadena de conexión local mostrada arriba

---

### **6. Reiniciar el Servidor de Next.js**

Después de arreglar la base de datos:

```powershell
# Detener el servidor (Ctrl+C en la terminal donde corre)
# Luego volver a iniciarlo:
npm run dev
```

---

## 🧪 PRUEBA COMPLETA

Sigue estos pasos en orden:

```powershell
# 1. Detener todo
docker compose down
# Ctrl+C en la terminal de Next.js

# 2. Iniciar PostgreSQL
docker compose up -d

# 3. Esperar 5 segundos
Start-Sleep -Seconds 5

# 4. Verificar estado
docker compose ps

# 5. Verificar salud de la BD (en navegador)
# Ir a: http://localhost:3000/api/health

# 6. Iniciar Next.js
npm run dev

# 7. Probar la aplicación
# Ir a: http://localhost:3000
```

---

## 🔍 Verificar el Estado de la BD en el Navegador

Mientras Next.js esté corriendo, abre:

**http://localhost:3000/api/health**

### **Respuesta Exitosa:**
```json
{
  "status": "ok",
  "message": "Base de datos conectada correctamente",
  "database": "PostgreSQL Local",
  "tables": ["admins", "assessments", "modules", ...]
}
```

### **Respuesta con Error:**
```json
{
  "status": "error",
  "message": "No se puede conectar a PostgreSQL",
  "hint": "Verifica que Docker esté ejecutándose con: docker compose ps"
}
```

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### **Error: "ECONNREFUSED" o "Connection refused"**

**Causa:** PostgreSQL no está ejecutándose.

**Solución:**
```powershell
docker compose up -d
```

---

### **Error: "database does not exist"**

**Causa:** La base de datos no fue creada correctamente.

**Solución:**
```powershell
# Recrear todo desde cero
docker compose down -v
docker compose up -d
```

---

### **Error: "Faltan tablas en la base de datos"**

**Causa:** El script `init.sql` no se ejecutó.

**Solución:**
```powershell
# Opción 1: Recrear el contenedor
docker compose down -v
docker compose up -d

# Opción 2: Ejecutar el script manualmente
docker compose exec -T postgres psql -U escazu_user -d herramienta_escazu < init.sql
```

---

### **Error: "PASSWORD_URL tiene valores placeholder"**

**Causa:** El archivo `.env.local` no está configurado.

**Solución:**
```powershell
# Crear/editar .env.local
echo 'DATABASE_URL=postgresql://escazu_user:escazu_password_2024@localhost:5432/herramienta_escazu' > .env.local

# Reiniciar Next.js
# Ctrl+C y luego npm run dev
```

---

### **Error: "puerto 5432 ya está en uso"**

**Causa:** Ya hay otro PostgreSQL corriendo en tu sistema.

**Solución 1 - Usar otro puerto:**

Edita `compose.yaml`:
```yaml
ports:
  - "5433:5432"  # Cambiar 5432 a 5433
```

Edita `.env.local`:
```
DATABASE_URL=postgresql://escazu_user:escazu_password_2024@localhost:5433/herramienta_escazu
```

**Solución 2 - Detener el otro PostgreSQL:**
```powershell
# Ver qué está usando el puerto
netstat -ano | findstr :5432

# Detener el servicio de PostgreSQL en Windows
net stop postgresql-x64-15
```

---

## 📊 LOGS ÚTILES

### **Ver logs de Docker:**
```powershell
# Logs en tiempo real
docker compose logs -f

# Solo de postgres
docker compose logs -f postgres

# Últimas 50 líneas
docker compose logs --tail=50 postgres
```

### **Ver logs de Next.js:**
- Revisa la terminal donde ejecutaste `npm run dev`
- Busca líneas que empiecen con `❌` o `Error`

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de reportar un problema, verifica:

- [ ] Docker Desktop está instalado
- [ ] Docker Desktop está ejecutándose (ícono en la barra de tareas)
- [ ] `docker compose ps` muestra el contenedor "Up"
- [ ] El archivo `.env.local` existe y tiene la URL correcta
- [ ] http://localhost:3000/api/health muestra status "ok"
- [ ] `npm run db:connect` se conecta exitosamente
- [ ] `\dt` en psql muestra las 7 tablas
- [ ] Next.js se reinició después de cambiar `.env.local`

---

## 🆘 Si Nada Funciona

1. **Elimina todo y empieza de cero:**

```powershell
# Detener y limpiar Docker
docker compose down -v

# Eliminar .env.local
Remove-Item .env.local

# Crear desde ejemplo
Copy-Item .env.example .env.local

# Iniciar PostgreSQL
docker compose up -d

# Esperar 10 segundos
Start-Sleep -Seconds 10

# Verificar
docker compose ps
docker compose logs postgres

# Iniciar Next.js
npm run dev
```

2. **Revisar los logs detallados:**
   - En la consola del navegador (F12)
   - En la terminal de Next.js
   - En los logs de Docker: `docker compose logs`

3. **Consultar la documentación:**
   - [SETUP_LOCAL.md](./SETUP_LOCAL.md) - Guía completa de configuración
   - [README.md](./README.md) - Descripción general

---

## 📞 Información de Contacto

Si después de seguir todos estos pasos el error persiste, incluye la siguiente información:

- Sistema operativo: Windows/Mac/Linux
- Versión de Docker: `docker --version`
- Versión de Node: `node --version`
- Estado de contenedores: `docker compose ps`
- Resultado de: http://localhost:3000/api/health
- Últimos logs: `docker compose logs --tail=50`

---

**¡La base de datos local te permite desarrollar sin conexión a internet y con total control!** 🚀
