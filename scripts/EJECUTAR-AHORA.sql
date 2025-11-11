-- ============================================
-- SCRIPT PARA AGREGAR MÓDULO 4
-- Ejecuta esto en Neon Console SQL Editor
-- ============================================

-- 1. AGREGAR MÓDULO 4
INSERT INTO modules (id, name, description, order_index) VALUES
(4, 'Preguntas Generales', 'Preguntas abiertas de reflexión y buenas prácticas (no califican)', 4)
ON CONFLICT (id) DO NOTHING;

-- 2. ACTUALIZAR PREGUNTAS 36-39 AL MÓDULO 4
UPDATE questions SET module_id = 4 WHERE id IN (36, 37, 38, 39);

-- 3. AGREGAR PREGUNTAS ABIERTAS SI NO EXISTEN
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

-- 4. VERIFICAR RESULTADOS
SELECT 'Módulos registrados:' as titulo;
SELECT id, name, order_index FROM modules ORDER BY order_index;

SELECT 'Preguntas del Módulo 4:' as titulo;
SELECT id, LEFT(question_text, 60) as pregunta, question_type 
FROM questions 
WHERE module_id = 4 
ORDER BY order_index;

SELECT 'Total de preguntas por módulo:' as titulo;
SELECT module_id, COUNT(*) as total 
FROM questions 
GROUP BY module_id 
ORDER BY module_id;
