# 🐳 Configuración Local con Docker Compose

Esta guía te ayudará a configurar el entorno de desarrollo local con PostgreSQL usando Docker Compose.

## 📋 Prerrequisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y ejecutándose
- Node.js 18+ instalado
- Git

## 🚀 Inicio Rápido

### 1. Iniciar la Base de Datos

```bash
# Iniciar PostgreSQL en Docker
docker compose up -d

# Verificar que el contenedor está ejecutándose
docker compose ps
```

Deberías ver algo como:
```
NAME                    IMAGE                COMMAND                  SERVICE     STATUS
herramienta-escazu-db   postgres:15-alpine   "docker-entrypoint.s…"   postgres    Up
```

### 2. Verificar la Conexión

```bash
# Conectarse a PostgreSQL usando el cliente de Docker
docker compose exec postgres psql -U escazu_user -d herramienta_escazu

# Una vez dentro, puedes ejecutar:
\dt  # Listar todas las tablas
\q   # Salir
```

### 3. Iniciar la Aplicación Next.js

```bash
# Instalar dependencias (si aún no lo has hecho)
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## 🗄️ Configuración de la Base de Datos

### Cadena de Conexión

La cadena de conexión está configurada en `.env.local`:

```
DATABASE_URL=postgresql://escazu_user:escazu_password_2024@localhost:5432/herramienta_escazu
```

### Credenciales por Defecto

- **Usuario**: `escazu_user`
- **Contraseña**: `escazu_password_2024`
- **Base de datos**: `herramienta_escazu`
- **Puerto**: `5432`
- **Host**: `localhost`

## 📊 Estructura de la Base de Datos

El archivo `init.sql` crea automáticamente las siguientes tablas:

- `modules` - Módulos de la evaluación
- `questions` - Preguntas por módulo
- `response_options` - Opciones de respuesta (Sí-Básico, Sí-Intermedio, etc.)
- `users` - Usuarios que completan la evaluación
- `responses` - Respuestas de los usuarios
- `assessments` - Evaluaciones completas con puntuación
- `admins` - Usuarios administradores

## 🛠️ Comandos Útiles

### Gestión del Contenedor

```bash
# Iniciar los servicios
docker compose up -d

# Detener los servicios
docker compose down

# Ver logs
docker compose logs -f

# Reiniciar los servicios
docker compose restart

# Detener Y eliminar volúmenes (¡CUIDADO! Esto borra todos los datos)
docker compose down -v
```

### Acceso a PostgreSQL

```bash
# Conectarse a la base de datos
docker compose exec postgres psql -U escazu_user -d herramienta_escazu

# Hacer backup de la base de datos
docker compose exec postgres pg_dump -U escazu_user herramienta_escazu > backup.sql

# Restaurar desde backup
docker compose exec -T postgres psql -U escazu_user -d herramienta_escazu < backup.sql
```

### Comandos SQL Útiles

Desde el cliente de PostgreSQL (`psql`):

```sql
-- Listar todas las tablas
\dt

-- Describir una tabla
\d users

-- Ver todas las evaluaciones
SELECT * FROM assessments ORDER BY completed_at DESC LIMIT 10;

-- Contar evaluaciones por clasificación
SELECT classification, COUNT(*) 
FROM assessments 
GROUP BY classification;

-- Ver respuestas de un usuario específico
SELECT u.name, q.question_text, ro.option_text, r.justification
FROM responses r
JOIN users u ON r.user_id = u.id
JOIN questions q ON r.question_id = q.id
LEFT JOIN response_options ro ON r.response_option_id = ro.id
WHERE u.id = 1;

-- Limpiar todas las evaluaciones (útil para testing)
TRUNCATE TABLE responses, assessments, users RESTART IDENTITY CASCADE;
```

## 🔄 Cambiar entre Entornos

### Usar Base de Datos Local

```bash
# Asegúrate de que .env.local tiene:
DATABASE_URL=postgresql://escazu_user:escazu_password_2024@localhost:5432/herramienta_escazu
```

### Usar Base de Datos en Neon (Producción)

```bash
# Cambia .env.local a:
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
```

## 📁 Archivos de Configuración

- `compose.yaml` - Configuración de Docker Compose
- `init.sql` - Script de inicialización de la base de datos
- `.env.local` - Variables de entorno locales (cadena de conexión)
- `lib/database.ts` - Funciones de acceso a la base de datos

## 🧪 Insertar Datos de Prueba

Si necesitas datos de prueba para desarrollo:

```bash
# Conectarse a la base de datos
docker compose exec postgres psql -U escazu_user -d herramienta_escazu

# Ejecutar desde SQL:
```

```sql
-- Insertar un usuario de prueba
INSERT INTO users (name, contact, entity, municipality) VALUES
    ('Juan Pérez', '3001234567 / juan@test.com', 'Municipio Test', 'Bogotá');

-- Insertar una evaluación de prueba
INSERT INTO assessments (user_id, total_score, max_possible_score, percentage, classification) VALUES
    (1, 85, 117, 72.65, 'Bien encaminado');
```

## ⚠️ Solución de Problemas

### El contenedor no inicia

```bash
# Ver logs para identificar el problema
docker compose logs postgres

# Asegúrate de que el puerto 5432 no esté en uso
netstat -an | findstr :5432
```

### Error de conexión "Connection refused"

- Verifica que Docker Desktop esté ejecutándose
- Confirma que el contenedor está up: `docker compose ps`
- Espera unos segundos hasta que el healthcheck pase

### Las tablas no se crean

```bash
# Elimina el volumen y vuelve a crear
docker compose down -v
docker compose up -d

# Verifica que init.sql se ejecutó
docker compose logs postgres | findstr "inicializada"
```

### Cambiar las credenciales

1. Edita `compose.yaml` y cambia las variables de entorno
2. Actualiza `.env.local` con las nuevas credenciales
3. Recrea el contenedor:
   ```bash
   docker compose down -v
   docker compose up -d
   ```

## 🔒 Seguridad

> ⚠️ **IMPORTANTE**: Las credenciales en `compose.yaml` son para desarrollo local únicamente. 
> 
> **NUNCA** uses estas credenciales en producción ni las subas a un repositorio público.

Para producción:
- Usa variables de entorno seguras
- Genera contraseñas fuertes
- Configura SSL/TLS
- Restringe el acceso por IP

## 📚 Recursos Adicionales

- [Documentación de PostgreSQL](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Neon Database](https://neon.tech/) - Para producción

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs: `docker compose logs -f`
2. Verifica el estado: `docker compose ps`
3. Consulta la documentación oficial
