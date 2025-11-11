# 🚀 Ejecutar Localmente - Paso a Paso

## ⚠️ IMPORTANTE: Primero Actualiza la Base de Datos

**Tanto local como Vercel usan la MISMA base de datos en Neon.**  
Por eso DEBES ejecutar el script SQL primero.

---

## 📋 Paso 1: Actualizar Base de Datos en Neon (OBLIGATORIO)

### 1.1 Abre Neon Console
```
https://console.neon.tech
```

### 1.2 Ve a SQL Editor
- Menú lateral → **SQL Editor**

### 1.3 Ejecuta el Script
1. Abre el archivo: `scripts/EJECUTAR-AHORA.sql`
2. **Copia TODO** el contenido (Ctrl+A, Ctrl+C)
3. **Pégalo** en Neon SQL Editor (Ctrl+V)
4. Haz clic en **"Run"** o presiona `Ctrl+Enter`

### 1.4 Verifica los Resultados
Deberías ver 3 tablas:
- ✅ 4 módulos (con el nuevo "Preguntas Generales")
- ✅ 4 preguntas del Módulo 4
- ✅ Total por módulo (1:11, 2:8, 3:16, 4:4)

**⛔ NO CONTINÚES hasta que este paso esté completo**

---

## 🖥️ Paso 2: Ejecutar Servidor Local

### Opción A: Usar el Archivo BAT (Recomendado)

1. **Doble clic** en el archivo:
   ```
   EJECUTAR-LOCAL.bat
   ```

2. Espera a que aparezca:
   ```
   ✓ Ready in 3.5s
   ○ Local: http://localhost:3000
   ```

3. **Abre tu navegador** en:
   - App principal: http://localhost:3000
   - Panel admin: http://localhost:3000/admin

---

### Opción B: Comandos Manuales (Alternativa)

Si prefieres ejecutar los comandos uno por uno:

#### 1. Abre CMD (NO PowerShell)
- Presiona `Win+R`
- Escribe: `cmd`
- Enter

#### 2. Navega a la carpeta del proyecto
```cmd
cd c:\Users\pardo\OneDrive\Documentos\GitHub\herramienta-escazu
```

#### 3. Instala dependencias
```cmd
npm install
```

#### 4. Genera cliente Prisma
```cmd
npx prisma generate
```

#### 5. Inicia servidor
```cmd
npm run dev
```

---

## 🎯 Verificar que Funciona

### 1. Accede al Panel Admin
```
http://localhost:3000/admin
```

### 2. Inicia Sesión
- Usuario: `admin`
- Contraseña: `admin123`

### 3. Verifica el Módulo 4
- Debes ver **"Módulo 4: Preguntas Generales"** en la lista
- Si lo ves, **¡funcionó!** ✅
- Si no lo ves, vuelve al Paso 1 y ejecuta el script SQL

### 4. Prueba el Formulario Principal
```
http://localhost:3000
```
- Completa las preguntas hasta el final
- Después de la pregunta 35, debe aparecer el introductorio del Módulo 4
- Las preguntas 36-39 deben ser campos de texto abiertos

---

## 🐛 Solución de Problemas

### Error: "Module not found"
```cmd
npm install
npx prisma generate
```

### Error: "Cannot find module @prisma/client"
```cmd
npx prisma generate
```

### Error: "Database connection failed"
Verifica tu archivo `.env`:
```
DATABASE_URL="postgresql://[tu-usuario]:[tu-password]@[tu-host]/[tu-database]"
```

### El panel admin sigue con error
- ✅ ¿Ejecutaste el script SQL en Neon?
- ✅ ¿Viste los 4 módulos en los resultados?
- ✅ ¿Reiniciaste el servidor después del script?

Presiona `Ctrl+C` en la terminal y vuelve a ejecutar:
```cmd
npm run dev
```

---

## 🔄 Detener el Servidor

Presiona `Ctrl+C` en la terminal donde corre el servidor.

---

## ✅ Checklist

- [ ] Script SQL ejecutado en Neon
- [ ] Resultados verificados (4 módulos)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Prisma generado (`npx prisma generate`)
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Panel admin carga sin errores
- [ ] Módulo 4 visible en admin
- [ ] Preguntas 36-39 son campos abiertos

---

## 📞 Notas Importantes

1. **El servidor local usa la base de datos de Neon** (no usa base de datos local)
2. **Cualquier cambio que hagas en Neon afecta local Y producción**
3. **Puerto por defecto**: http://localhost:3000
4. **Para detener**: Ctrl+C en la terminal

---

¡Ejecuta primero el script SQL en Neon, luego doble clic en `EJECUTAR-LOCAL.bat`! 🚀
