# Actualización: Módulo 4 - Preguntas Generales

## 📋 Resumen de Cambios

Se ha creado un **nuevo Módulo 4** llamado "Preguntas Generales" que contiene las **4 preguntas abiertas** (36, 37, 38 y 39) que anteriormente estaban en el Módulo 3.

### ✨ Características del Módulo 4:
- **Tipo de preguntas**: Abiertas (respuesta de texto libre)
- **Puntuación**: NO califican ni suman puntos
- **Propósito**: Reflexión y buenas prácticas institucionales
- **Posición**: Aparece después de completar el Módulo 3 (pregunta 35)

---

## 🔄 Actualización de Base de Datos en Neon

### Opción 1: Script SQL Completo (Recomendado)

1. **Accede a Neon Console**:
   - Ve a: https://console.neon.tech
   - Selecciona tu proyecto
   - Ve a **SQL Editor**

2. **Ejecuta el siguiente script SQL**:

```sql
-- ============================================
-- AGREGAR MÓDULO 4
-- ============================================
INSERT INTO modules (id, name, description, order_index) VALUES
(4, 'Preguntas Generales', 'Preguntas abiertas de reflexión y buenas prácticas (no califican)', 4)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ACTUALIZAR PREGUNTAS 36-39 AL MÓDULO 4
-- ============================================
UPDATE questions SET module_id = 4 WHERE id IN (36, 37, 38, 39);

-- ============================================
-- AGREGAR PREGUNTAS ABIERTAS SI NO EXISTEN
-- ============================================
INSERT INTO questions (id, module_id, question_text, question_type, order_index, recommendations) VALUES
(36, 4, '36. Describan las principales fortalezas de nuestra entidad en materia de transparencia, participación y evaluación ambiental', 'open', 36, '{"general": "Sistematicen y documenten las fortalezas identificadas como buenas prácticas institucionales"}'),
(37, 4, '37. Identifiquen los principales retos y oportunidades de mejora en la implementación de los derechos de acceso en asuntos ambientales', 'open', 37, '{"general": "Elaboren un plan de mejoramiento institucional integral basado en los retos identificados"}'),
(38, 4, '38. ¿Los mecanismos de participación ambiental que promueve la entidad aseguran la inclusión activa de mujeres y diversidades de género, en condiciones de equidad frente a la toma de decisiones y el acceso a la información ambiental?', 'open', 38, '{}'),
(39, 4, '39. ¿Se han implementado protocolos, indicadores o acciones específicas para identificar y reducir las barreras que enfrentan las mujeres y poblaciones con enfoque diferencial (edad, etnia, discapacidad, orientación sexual) en los procesos de licenciamiento, consultas y participación ambiental?', 'open', 39, '{}')
ON CONFLICT (id) DO UPDATE SET 
  module_id = EXCLUDED.module_id,
  question_text = EXCLUDED.question_text,
  question_type = EXCLUDED.question_type,
  order_index = EXCLUDED.order_index,
  recommendations = EXCLUDED.recommendations;

-- ============================================
-- VERIFICAR CAMBIOS
-- ============================================
SELECT 'Verificación de módulos:' as mensaje;
SELECT * FROM modules ORDER BY order_index;

SELECT 'Verificación de preguntas del Módulo 4:' as mensaje;
SELECT id, module_id, LEFT(question_text, 50) as pregunta_inicio, question_type 
FROM questions 
WHERE module_id = 4 
ORDER BY order_index;

SELECT 'Total de preguntas por módulo:' as mensaje;
SELECT module_id, COUNT(*) as total_preguntas 
FROM questions 
GROUP BY module_id 
ORDER BY module_id;
```

3. **Verifica los resultados**:
   - Debes ver 4 módulos en total
   - El módulo 4 debe tener 4 preguntas (36-39)
   - Todas las preguntas del módulo 4 deben ser tipo `open`

---

## 🎯 Impacto en la Aplicación

### Frontend (Ya actualizado):

1. **`lib/questions-data.ts`**:
   - ✅ Módulo 4 agregado
   - ✅ Preguntas 36-39 movidas al módulo 4

2. **`components/module-introduction.tsx`**:
   - ✅ Contenido introductorio para módulo 4
   - ✅ Oculta escala de puntuación para módulo 4
   - ✅ Mensaje destacado: "NO generan puntuación"

3. **Flujo de Usuario**:
   ```
   Módulo 1 (11 preguntas) → Módulo 2 (8 preguntas) → Módulo 3 (35 preguntas)
   ↓
   🆕 Introductorio Módulo 4
   ↓
   Pregunta 36 (abierta) → Pregunta 37 (abierta) → Pregunta 38 (abierta) → Pregunta 39 (abierta)
   ↓
   Resultados Finales
   ```

---

## 📊 Estadísticas Actualizadas

| Módulo | Nombre | Preguntas | Tipo | Puntúa |
|--------|--------|-----------|------|--------|
| 1 | Transparencia y Acceso | 11 | Cerradas | ✅ Sí |
| 2 | Divulgación y Publicación | 8 | Cerradas | ✅ Sí |
| 3 | Participación Ciudadana | 16 | Cerradas | ✅ Sí |
| 4 | Preguntas Generales | 4 | Abiertas | ❌ No |
| **TOTAL** | - | **39** | Mixto | - |

**Total preguntas que califican**: 35 (preguntas 1-35)  
**Total preguntas de reflexión**: 4 (preguntas 36-39)

---

## ⚠️ Notas Importantes

1. **Las preguntas 36-39 NO afectan el puntaje final** del diagnóstico
2. **Son obligatorias** pero no generan calificación
3. El **introductorio del Módulo 4** explica claramente que son preguntas de reflexión
4. Las respuestas se guardan en la base de datos para análisis cualitativo

---

## 🚀 Despliegue

Los cambios del frontend ya están desplegados en:
- **Producción**: https://escazu.vercel.app

Una vez ejecutes el script SQL en Neon, la aplicación funcionará completamente con el nuevo módulo.

---

## ✅ Checklist de Actualización

- [ ] Ejecutar script SQL en Neon Console
- [ ] Verificar que existen 4 módulos
- [ ] Verificar que preguntas 36-39 están en módulo 4
- [ ] Probar flujo completo en la aplicación
- [ ] Verificar que aparece introductorio del módulo 4
- [ ] Confirmar que preguntas 36-39 no suman puntos

---

## 📞 Soporte

Si encuentras algún problema durante la actualización, verifica:
1. Que la conexión a Neon esté activa
2. Que el usuario tenga permisos de escritura
3. Que no haya evaluaciones en curso (podrían tener conflictos)

¡La actualización está lista para aplicarse! 🎉
