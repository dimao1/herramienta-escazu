# 🚀 Cómo Poblar la Base de Datos Neon

## Paso 1: Acceder a Neon Console

1. Ve a: **https://console.neon.tech**
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto (el que tiene la base de datos para escazu)

## Paso 2: Abrir SQL Editor

1. En el menú lateral izquierdo, haz click en **"SQL Editor"**
2. Verás un editor de SQL en el centro de la pantalla

## Paso 3: Ejecutar el Script

### Opción A: Copiar todo el script

1. Abre el archivo: `scripts/seed-neon.sql`
2. Copia TODO el contenido (Ctrl+A, Ctrl+C)
3. Pega en el SQL Editor de Neon
4. Click en **"Run"** (botón verde) o presiona **Ctrl+Enter**

### Opción B: Ejecutar por secciones

Si prefieres ir paso por paso:

1. **Primero**: Admin
```sql
INSERT INTO admins (username, password_hash) 
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO UPDATE SET password_hash = 'admin123';
```

2. **Segundo**: Opciones de respuesta (las 5 opciones)
3. **Tercero**: Módulos (los 3 módulos)
4. **Cuarto**: Preguntas (las 15 preguntas con recomendaciones)

## Paso 4: Verificar

Al final del script se ejecutan queries de verificación que mostrarán:
- Total de admins: **1**
- Total de módulos: **3**
- Total de preguntas: **15**
- Total de opciones: **5**

## ✅ Listo!

Ahora puedes:

1. **Verificar en Vercel**:
   ```
   https://escazu.vercel.app/api/health
   ```

2. **Hacer login**:
   ```
   https://escazu.vercel.app/admin
   Usuario: admin
   Password: admin123
   ```

3. **Probar el cuestionario**:
   ```
   https://escazu.vercel.app
   ```

## 🔧 Troubleshooting

### Error: "duplicate key value violates unique constraint"
- **Solución**: Ya existen datos. Usa `ON CONFLICT DO NOTHING` o borra primero con:
  ```sql
  DELETE FROM responses;
  DELETE FROM assessments;
  DELETE FROM questions;
  DELETE FROM modules;
  DELETE FROM admins;
  ```

### Error: "column does not exist"
- **Solución**: El schema no está sincronizado. Ejecuta desde local:
  ```bash
  npx prisma db push --accept-data-loss
  ```

### No veo las tablas en Neon
- **Solución**: Verifica que estás en el branch correcto (generalmente "main")
- Revisa que DATABASE_URL en Vercel apunta a la DB correcta
