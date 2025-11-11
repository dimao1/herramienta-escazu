-- Script SQL para poblar base de datos Neon
-- Ejecuta esto en: https://console.neon.tech > SQL Editor

-- ============================================
-- 1. CREAR ADMIN
-- ============================================
INSERT INTO admins (username, password_hash) 
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO UPDATE SET password_hash = 'admin123';

-- ============================================
-- 2. CREAR OPCIONES DE RESPUESTA
-- ============================================
INSERT INTO response_options (id, option_text, points, excludes_from_calculation) VALUES
(1, 'Sí - Básico', 1, false),
(2, 'Sí - Avanzado', 2, false),
(3, 'No', 0, false),
(4, 'No Aplica', 0, true),
(5, 'Desconoce', 0, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3. CREAR MÓDULOS
-- ============================================
INSERT INTO modules (id, name, description, order_index) VALUES
(1, 'Módulo 1: Transparencia y Acceso a la Información Ambiental', 'Evaluación de transparencia y acceso a información', 1),
(2, 'Módulo 2: Divulgación y publicación de información ambiental', 'Evaluación de divulgación y publicación de información ambiental', 2),
(3, 'Módulo 3: Participación ciudadana en la toma de decisiones ambientales', 'Evaluación de participación en decisiones', 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 4. CREAR PREGUNTAS - MÓDULO 1
-- ============================================
INSERT INTO questions (id, module_id, question_text, question_type, order_index, recommendations) VALUES
(1, 1, '¿Su municipio cuenta con una política, procedimiento o lineamiento para garantizar el acceso a la información ambiental?', 'single', 1, '{"basic": "Desarrollar una política escrita", "advanced": "Implementar sistema digital de consultas"}'),
(2, 1, '¿Existe un procedimiento claro y específico para que las personas puedan solicitar información ambiental?', 'single', 2, '{"basic": "Crear procedimiento formal", "advanced": "Automatizar el proceso"}'),
(3, 1, '¿El municipio tiene un registro o sistema para monitorear las solicitudes de información ambiental recibidas?', 'single', 3, '{"basic": "Implementar registro básico", "advanced": "Sistema digital de seguimiento"}'),
(4, 1, '¿Se respetan los plazos legales establecidos para responder solicitudes de información ambiental?', 'single', 4, '{"basic": "Establecer alertas de vencimiento", "advanced": "Sistema automatizado de plazos"}'),
(5, 1, '¿Existe un mecanismo para que las personas apelen o presenten quejas si se les niega el acceso a información ambiental?', 'single', 5, '{"basic": "Crear mecanismo de apelación", "advanced": "Portal de quejas en línea"}')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 5. CREAR PREGUNTAS - MÓDULO 2
-- ============================================
INSERT INTO questions (id, module_id, question_text, question_type, order_index, recommendations) VALUES
(6, 2, '¿El municipio cuenta con un sitio web o plataforma digital donde publica información ambiental?', 'single', 1, '{"basic": "Crear sección ambiental en sitio web", "advanced": "Portal ambiental interactivo"}'),
(7, 2, '¿Se publican informes periódicos sobre el estado del medio ambiente en el municipio?', 'single', 2, '{"basic": "Publicar informe anual", "advanced": "Reportes trimestrales digitales"}'),
(8, 2, '¿Se divulgan los resultados de las evaluaciones de impacto ambiental realizadas en el municipio?', 'single', 3, '{"basic": "Publicar resúmenes ejecutivos", "advanced": "Base de datos pública de EIAs"}'),
(9, 2, '¿El municipio publica datos sobre calidad del aire, agua y otros indicadores ambientales?', 'single', 4, '{"basic": "Reportes básicos de monitoreo", "advanced": "Dashboard en tiempo real"}'),
(10, 2, '¿Se utiliza un lenguaje accesible y comprensible en la información ambiental publicada?', 'single', 5, '{"basic": "Revisar comunicaciones", "advanced": "Infografías y contenido multimedia"}')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 6. CREAR PREGUNTAS - MÓDULO 3
-- ============================================
INSERT INTO questions (id, module_id, question_text, question_type, order_index, recommendations) VALUES
(11, 3, '¿Existen mecanismos formales para la participación ciudadana en decisiones ambientales del municipio?', 'single', 1, '{"basic": "Crear comité ambiental", "advanced": "Plataforma digital de participación"}'),
(12, 3, '¿Se realizan consultas públicas sobre proyectos o políticas ambientales?', 'single', 2, '{"basic": "Implementar consultas básicas", "advanced": "Sistema de consulta digital"}'),
(13, 3, '¿Las comunidades afectadas participan en las evaluaciones de impacto ambiental?', 'single', 3, '{"basic": "Incluir reuniones comunitarias", "advanced": "Proceso participativo formal"}'),
(14, 3, '¿Existe un registro público de las observaciones ciudadanas sobre asuntos ambientales?', 'single', 4, '{"basic": "Crear registro básico", "advanced": "Portal público de observaciones"}'),
(15, 3, '¿Se informa a la ciudadanía sobre cómo sus comentarios fueron considerados en las decisiones finales?', 'single', 5, '{"basic": "Publicar respuestas", "advanced": "Sistema de retroalimentación"}')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 7. VERIFICAR DATOS
-- ============================================
SELECT 'Verificación de datos:' as mensaje;
SELECT COUNT(*) as total_admins FROM admins;
SELECT COUNT(*) as total_modules FROM modules;
SELECT COUNT(*) as total_questions FROM questions;
SELECT COUNT(*) as total_response_options FROM response_options;

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
SELECT '¡Datos cargados exitosamente!' as resultado;
