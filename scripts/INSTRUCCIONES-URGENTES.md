# 🚨 INSTRUCCIONES URGENTES - Reparar Panel Admin

## ❗ Problema
El panel de administración muestra error porque **falta el Módulo 4 en la base de datos**.

---

## ✅ Solución (5 minutos)

### Paso 1: Abrir Neon Console
1. Ve a: **https://console.neon.tech**
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto (herramienta-escazu)

### Paso 2: Abrir SQL Editor
1. En el menú lateral izquierdo, haz clic en **"SQL Editor"**
2. Se abrirá un editor de código SQL

### Paso 3: Copiar y Ejecutar Script
1. Abre el archivo: `scripts/EJECUTAR-AHORA.sql`
2. **Copia TODO el contenido** del archivo
3. **Pégalo** en el SQL Editor de Neon
4. Haz clic en **"Run"** o presiona `Ctrl+Enter`

### Paso 4: Verificar Resultados
Deberías ver 3 resultados:

#### Resultado 1: Módulos registrados
```
id | name                    | order_index
1  | Módulo 1: Transparencia | 1
2  | Módulo 2: Divulgación   | 2
3  | Módulo 3: Participación | 3
4  | Preguntas Generales     | 4  ← NUEVO
```

#### Resultado 2: Preguntas del Módulo 4
```
id | pregunta                                           | question_type
36 | 36. Describan las principales fortalezas...       | open
37 | 37. Identifiquen los principales retos...         | open
38 | 38. ¿Los mecanismos de participación...           | open
39 | 39. ¿Se han implementado protocolos...            | open
```

#### Resultado 3: Total de preguntas por módulo
```
module_id | total
1         | 11
2         | 8
3         | 16
4         | 4  ← NUEVO
```

### Paso 5: Refrescar el Panel Admin
1. Ve a: **https://escazu.vercel.app/admin**
2. Presiona `Ctrl+F5` para recargar (forzar recarga sin caché)
3. Inicia sesión si es necesario
4. **¡El error debe haber desaparecido!** ✅

---

## 🔍 ¿Qué hace el script?

1. **Agrega el Módulo 4** llamado "Preguntas Generales"
2. **Mueve las preguntas 36-39** del Módulo 3 al Módulo 4
3. **Actualiza el tipo** de estas preguntas a "open" (abiertas)
4. **Verifica** que todo se haya aplicado correctamente

---

## ⚠️ Notas Importantes

- El script es **seguro** y usa `ON CONFLICT DO NOTHING` para evitar duplicados
- Si ya ejecutaste el script antes, no habrá problemas al ejecutarlo de nuevo
- Las preguntas 36-39 NO afectarán el puntaje de las evaluaciones
- El panel admin debe funcionar perfectamente después de esto

---

## 📞 Si el Error Persiste

1. Verifica que el script se haya ejecutado sin errores en Neon
2. Revisa la consola del navegador (`F12` → Console) para ver el error exacto
3. Intenta limpiar la caché del navegador completamente
4. Intenta en modo incógnito/privado

---

## ✅ Checklist de Verificación

- [ ] Script ejecutado en Neon Console
- [ ] Veo 4 módulos en los resultados
- [ ] Veo 4 preguntas en el Módulo 4
- [ ] Panel admin carga sin errores
- [ ] Puedo ver el nuevo "Módulo 4: Preguntas Generales"

---

¡Ejecuta el script ahora y el panel admin funcionará correctamente! 🎉
