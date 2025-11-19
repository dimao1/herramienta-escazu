# Herramienta Escazú  
## Informe de Cambios – Noviembre 2025

**Proyecto:** Herramienta de Diagnóstico Escazú  
**Periodo:** 7 al 16 de noviembre de 2025  
**Responsable técnico:** Equipo de desarrollo (dimao1)  
**Versión:** 1.0 – Informe de evidencias

---

## Índice

- [1. Resumen Ejecutivo](#1-resumen-ejecutivo)
- [2. Objetivo del Informe](#2-objetivo-del-informe)
- [3. Descripción General de la Herramienta](#3-descripción-general-de-la-herramienta)
- [4. Cambios Funcionales y de Contenido](#4-cambios-funcionales-y-de-contenido)
  - [4.1. Módulo 4 – Preguntas Generales](#41-módulo-4--preguntas-generales)
  - [4.2. Ajustes de Textos y Preguntas](#42-ajustes-de-textos-y-preguntas)
- [5. Mejoras en el Panel de Administración](#5-mejoras-en-el-panel-de-administración)
  - [5.1. Evaluaciones y Detalles de Resultados](#51-evaluaciones-y-detalles-de-resultados)
  - [5.2. Eliminación Masiva de Evaluaciones](#52-eliminación-masiva-de-evaluaciones)
  - [5.3. Corrección de Fechas y Horas](#53-corrección-de-fechas-y-horas)
- [6. Generación de Reportes en PDF](#6-generación-de-reportes-en-pdf)
  - [6.1. Estandarización del PDF de Resultados](#61-estandarización-del-pdf-de-resultados)
  - [6.2. Descarga de PDF desde el Panel Admin](#62-descarga-de-pdf-desde-el-panel-admin)
- [7. Integración con Base de Datos y Scripts](#7-integración-con-base-de-datos-y-scripts)
- [8. Mejoras de Interfaz y Experiencia de Usuario](#8-mejoras-de-interfaz-y-experiencia-de-usuario)
- [9. Tablas de Cambios](#9-tablas-de-cambios)
  - [9.1. Tabla de Cambios Funcionales](#91-tabla-de-cambios-funcionales)
  - [9.2. Tabla de Cambios en Panel de Administración](#92-tabla-de-cambios-en-panel-de-administración)
  - [9.3. Tabla de Cambios Técnicos e Infraestructura](#93-tabla-de-cambios-técnicos-e-infraestructura)
- [10. Conclusiones](#10-conclusiones)

---

## 1. Resumen Ejecutivo

Durante noviembre de 2025 se realizaron mejoras significativas a la Herramienta Escazú, enfocadas en tres ejes:

- **Funcionalidad y contenido**: creación del Módulo 4 de Preguntas Generales, refinamiento de textos y soporte completo para preguntas abiertas (incluyendo justificación y recomendaciones).
- **Panel de administración**: mejoras en visualización de evaluaciones, posibilidad de eliminar todas las evaluaciones con confirmación y descarga de reportes en PDF desde el panel admin.
- **Infraestructura y experiencia de usuario**: estabilización de la conexión con la base de datos Neon/Vercel, scripts para ejecución local, corrección de hora en Bogotá y ajustes de diseño responsivo con inclusión de los logos institucionales.

Las secciones siguientes documentan estos cambios con detalle, indicando fechas aproximadas, áreas impactadas y archivos relevantes, con el fin de servir como evidencia para informes técnicos o de seguimiento.

---

## 2. Objetivo del Informe

- Documentar las **modificaciones y mejoras** realizadas a la Herramienta Escazú en noviembre de 2025.
- Dejar constancia de:
  - Cambios funcionales visibles para usuarios y administradores.
  - Cambios técnicos en APIs, base de datos y scripts.
  - Ajustes de diseño y usabilidad.
- Proveer insumos para **reportes formales en PDF**, auditorías internas y seguimiento del proyecto.

---

## 3. Descripción General de la Herramienta

La Herramienta Escazú es una aplicación web que permite:

- Aplicar un diagnóstico sobre **Transparencia, Participación y Evaluación Ambiental**.
- Recoger respuestas cuantitativas (opciones con puntaje) y cualitativas (preguntas abiertas).
- Generar un **reporte de resultados en PDF** para la entidad evaluada.
- Consultar y gestionar evaluaciones desde un **panel de administración** protegido con usuario y contraseña.

Tecnologías principales:

- **Frontend:** Next.js y React.
- **Backend:** API Routes de Next.js.
- **Base de datos:** PostgreSQL (Neon, con configuración para local y Vercel).
- **Reportes PDF:** `jsPDF`.
- **Infraestructura local:** Docker y scripts de ejecución en Windows.

---

## 4. Cambios Funcionales y de Contenido

### 4.1. Módulo 4 – Preguntas Generales

- Creación del **Módulo 4: Preguntas Generales**, que agrupa preguntas abiertas sin puntaje.
- Reorganización de preguntas:
  - Preguntas 36–39 se trasladan a este módulo.
- Objetivo:
  - Recoger información cualitativa complementaria a los indicadores cuantitativos.
  - Permitir que las entidades describan contextos, dificultades y buenas prácticas.

**Evidencias técnicas:**

- Actualización de estructura de módulos y preguntas (archivo de datos de preguntas y módulos).
- Compatibilidad con el flujo del quiz y cálculo de puntaje (las preguntas abiertas no se incluyen en el cálculo numérico).

### 4.2. Ajustes de Textos y Preguntas

- Correcciones específicas:
  - Preguntas 38 y 39: ajuste de redacción e inclusión de signos de interrogación.
- Objetivo:
  - Mejorar claridad y coherencia con el lenguaje jurídico y técnico de Escazú.
  - Responder a observaciones de revisión funcional.

---

## 5. Mejoras en el Panel de Administración

### 5.1. Evaluaciones y Detalles de Resultados

- Corrección y mejora de la pestaña **Evaluaciones**:
  - Listado de evaluaciones con:
    - Nombre de la entidad.
    - Municipio.
    - Clasificación (Punto de partida, En proceso, Bien encaminado).
    - Puntuación, porcentaje y **número de respuestas**.
  - Modal de **“Detalles de la Evaluación”**:
    - Se muestran ahora correctamente:
      - Preguntas abiertas (últimas del formulario) con su **texto de respuesta**.
      - Casos “No” y “No aplica” acompañados del texto abierto (justificación o explicación).
      - Recomendaciones asociadas a cada respuesta, cuando existen.
- Ajustes en API y frontend para que:
  - Las respuestas abiertas, guardadas en base como `response_text`, se mapeen al campo `open_response` esperado por el frontend.
  - Se cuenten y muestren las respuestas por evaluación (`total_responses`).

### 5.2. Eliminación Masiva de Evaluaciones

- En la pestaña **Evaluaciones** se agregó el botón:

  > **Eliminar todas**

- Comportamiento:
  - Muestra un mensaje de confirmación:
    > “¿Seguro que deseas eliminar TODAS las evaluaciones? Esta acción no se puede deshacer.”
  - Si se confirma:
    - Llama a `DELETE /api/admin/assessments`.
    - El backend ejecuta una **transacción** que:
      - Elimina todas las filas de `responses`.
      - Elimina todas las filas de `assessments`.
      - Elimina todos los usuarios evaluados en `users`.
    - El dashboard refleja:
      - **Total Usuarios = 0**.
      - **Evaluaciones = 0**.
  - Se recarga la lista de evaluaciones y se muestran mensajes de éxito o error.

### 5.3. Corrección de Fechas y Horas

- Problema detectado:
  - En local la hora se veía correcta, pero en Vercel aparecía desfasada (por manejo de UTC).
- Solución:
  - Se eliminó el ajuste manual de `-5 horas`.
  - Se utiliza únicamente `Intl.DateTimeFormat` con:
    - `locale: "es-CO"`.
    - `timeZone: "America/Bogota"`.
- Resultado:
  - Las fechas de “Evaluaciones recientes” en el dashboard coinciden entre entorno local y Vercel.
  - La hora mostrada corresponde a la hora real de Colombia (UTC-5).

---

## 6. Generación de Reportes en PDF

### 6.1. Estandarización del PDF de Resultados

- Antes:
  - La pantalla de resultados del usuario final y el panel admin generaban PDFs con lógicas separadas, lo que producía formatos diferentes.
- Cambio:
  - Se creó la función común `generateResultsPdf` en `lib/generate-results-pdf.ts`.
  - Esta función:
    - Dibuja los **tres logos** (Ministerio, Alerta por mi Ambiente, Ruta 567).
    - Genera el encabezado con título y subtítulo.
    - Muestra:
      - Información del evaluado.
      - Puntuación total, máxima, porcentaje y clasificación.
      - Descripción breve del nivel de clasificación.
      - **Respuestas detalladas por módulo**, con:
        - Pregunta (limpiando numeraciones previas).
        - Respuesta (opción + texto abierto).
        - Justificación (si existe).
        - Recomendación (con fondo resaltado).
- Resultado:
  - El PDF descargado al finalizar la evaluación y el PDF descargado desde el panel admin
    son ahora **idénticos en diseño y contenido**.

### 6.2. Descarga de PDF desde el Panel Admin

- En el modal de “Detalles de la Evaluación” del panel admin se añadió el botón:

  > **Descargar PDF**

- El botón:
  - Construye los datos de:
    - Usuario (nombre, entidad, municipio, contacto).
    - Resumen de la evaluación (puntaje, máximo, porcentaje, clasificación).
    - Respuestas detalladas del usuario.
  - Llama a `generateResultsPdf(...)` para generar y descargar el informe.
- Beneficio:
  - El administrador puede descargar el mismo informe que tiene la entidad, sin necesidad
    de repetir la evaluación.

---

## 7. Integración con Base de Datos y Scripts

- **Conexión a Neon/Vercel:**
  - Configuración de `DATABASE_URL` y uso de `pool` de conexiones optimizado para entorno serverless.
  - Ajustes para compatibilidad entre nombres de columnas (`snake_case`) y propiedades del frontend.

- **Scripts SQL y de ejecución:**
  - `scripts/schema.sql`: script completo de creación de tablas (`users`, `assessments`, `responses`, `questions`, `modules`, `response_options`, `admins`) con claves foráneas y `ON DELETE CASCADE` donde aplica.
  - Script para poblar Neon desde consola, facilitando despliegues y restauración de datos.
  - Scripts para ejecución local en Windows (por ejemplo `EJECUTAR-LOCAL.bat`), integrando:
    - Arranque de contenedores Docker para la base.
    - Ejecución del servidor de desarrollo de Next.js.

---

## 8. Mejoras de Interfaz y Experiencia de Usuario

- **Identidad visual:**
  - Inclusión del logo **Ruta 567 Escazú** en headers y PDF, junto a:
    - Logo del Ministerio de Ambiente.
    - Logo **Alerta por mi Ambiente**.
  - Cambio de fondo de headers de verde a blanco para mejor visibilidad de los logos.

- **Layout y responsividad:**
  - Ajustes para pantallas pequeñas:
    - Reordenamiento y redimensionamiento de logos.
    - Alineación de logos para evitar desbordes.
    - Agregado de salto de línea en títulos largos de módulos/quiz.

- **Autoguardado de evaluaciones:**
  - Implementación de autoguardado en `localStorage` para:
    - Conservar respuestas, progreso, módulo actual y puntaje.
    - Mostrar un diálogo de recuperación cuando el usuario regresa a la herramienta.

---

## 9. Tablas de Cambios

### 9.1. Tabla de Cambios Funcionales

| Fecha aprox. | Área funcional                 | Descripción del cambio                                                                                         | Impacto principal                              |
|--------------|--------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| 11/11/2025   | Evaluación (frontend)          | Creación del **Módulo 4 – Preguntas Generales (abiertas)**                                                      | Mayor riqueza cualitativa del diagnóstico      |
| 11/11/2025   | Preguntas                      | Ajustes de redacción en preguntas 38 y 39 (signos de interrogación, claridad de texto)                         | Mejora de comprensión por parte del usuario    |
| 10/11/2025   | Flujo de evaluación            | Implementación de **autoguardado** de respuestas y progreso en `localStorage`                                  | Disminución de pérdida de información          |
| 16/11/2025   | Reportes                       | Unificación del formato de **PDF de resultados** para usuario y admin mediante `generateResultsPdf`            | Evidencia homogénea y profesional              |
| 16/11/2025   | Admin – Evaluaciones           | Descarga de PDF desde el modal de detalles, usando el mismo formato que el usuario final                       | Facilita el seguimiento y archivo institucional|

### 9.2. Tabla de Cambios en Panel de Administración

| Fecha aprox. | Sección admin     | Descripción del cambio                                                                                              | Archivos clave                                                        |
|--------------|-------------------|----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| 10/11/2025   | Acceso / Módulo   | Panel administrador funcionando contra base de datos local y en la nube                                             | `components/admin/admin-dashboard.tsx`                                |
| 11/11/2025   | Dashboard         | Health check y manejo de errores mejorados                                                                          | `app/api/admin/dashboard/route.ts`                                    |
| 11–13/11/2025| Evaluaciones      | Correcciones en la obtención de datos desde Neon/Vercel                                                             | `app/api/admin/assessments/route.ts`                                  |
| 14/11/2025   | Dashboard         | Corrección de zona horaria, uso de `Intl.DateTimeFormat` con `"America/Bogota"`                                    | `components/admin/admin-dashboard.tsx`                                |
| 14/11/2025   | Evaluaciones      | Botón **Eliminar todas** con confirmación y recarga de lista                                                       | `components/admin/assessments-viewer.tsx`                             |
| 14/11/2025   | Evaluaciones      | Endpoint **DELETE** para eliminar respuestas, evaluaciones y usuarios evaluados                                     | `app/api/admin/assessments/route.ts`                                  |
| 16/11/2025   | Evaluaciones      | Corrección de conteo de respuestas (`total_responses`) y visualización en tarjetas                                  | `app/api/admin/assessments/route.ts`, `assessments-viewer.tsx`        |
| 16/11/2025   | Detalles eval.    | Mostrar opción + texto abierto cuando la respuesta es “No” o “No aplica”, junto con justificación y recomendación   | `components/admin/assessments-viewer.tsx`                             |
| 16/11/2025   | Detalles eval.    | Botón **Descargar PDF** que usa `generateResultsPdf` para replicar el PDF del usuario final                         | `components/admin/assessments-viewer.tsx`, `lib/generate-results-pdf.ts` |

### 9.3. Tabla de Cambios Técnicos e Infraestructura

| Fecha aprox. | Área técnica             | Descripción del cambio                                                                                  | Archivos / Tareas relevantes                                      |
|--------------|--------------------------|----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| 10/11/2025   | Base de datos local      | Configuración de base en Docker y conexión desde la app                                                  | `docker-compose`, `lib/db`, scripts locales                       |
| 10/11/2025   | Autoguardado             | Lógica de guardado y recuperación de estado en el navegador                                              | `app/page.tsx` (estado, localStorage)                             |
| 11/11/2025   | DB Neon / Vercel         | Configuración de conexión a base remota y optimización de pool de conexiones                             | `lib/db.ts`, variables de entorno                                 |
| 11/11/2025   | Scripts SQL              | `schema.sql` y scripts de carga para reproducir la base en Neon                                          | `scripts/schema.sql`, scripts de export/import                    |
| 11/11/2025   | Health checks            | Actualización de endpoints de salud para verificar conexión con la base                                  | `app/api/health/route.ts` (según configuración del proyecto)      |
| 11/11/2025   | PDF y logos              | Inclusión de logo “Alerta por mi Ambiente” y “Ruta 567 Escazú” en headers y PDF                          | `components/results-page.tsx`, `lib/generate-results-pdf.ts`      |
| 13/11/2025   | Limpieza de código       | Eliminación de archivos sin uso para simplificar el repositorio                                          | Varios archivos obsoletos                                         |
| 16/11/2025   | Compartir lógica de PDF  | Creación de `generateResultsPdf` y refactor de ResultsPage y Admin para reutilizarlo                     | `lib/generate-results-pdf.ts`, `results-page.tsx`, `assessments-viewer.tsx` |

---

## 10. Conclusiones

- La Herramienta Escazú ha tenido una evolución importante en noviembre de 2025, pasando de una versión funcional inicial a una versión más **robusta, trazable y alineada** con las necesidades de reporte y evidencia.
- Los cambios realizados permiten:
  - Contar con un **panel de administración sólido** para consulta, eliminación masiva y descarga de reportes.
  - Generar **PDFs consistentes** entre la vista del usuario y la del administrador.
  - Responder a observaciones de contenido, usabilidad e identidad visual (logos y diseño).
  - Tener un camino claro para seguir escalando la herramienta en entornos locales y en la nube.

Este informe puede exportarse directamente a PDF desde cualquier herramienta que soporte Markdown (por ejemplo, VS Code + extensión, Pandoc o un editor web), manteniendo la estructura de portada, índice y tablas de cambios presentada aquí.
