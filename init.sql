-- Script de inicialización de la base de datos
-- Herramienta de Autodiagnóstico - Ruta de Escazú 567

-- Tabla de módulos
CREATE TABLE IF NOT EXISTS modules (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL
);

-- Tabla de preguntas
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('statement', 'open')),
    order_index INTEGER NOT NULL,
    recommendation TEXT
);

-- Tabla de opciones de respuesta
CREATE TABLE IF NOT EXISTS response_options (
    id SERIAL PRIMARY KEY,
    option_text TEXT NOT NULL,
    points INTEGER NOT NULL,
    excludes_from_calculation BOOLEAN DEFAULT FALSE
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT,
    entity TEXT,
    municipality TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de respuestas de usuarios
CREATE TABLE IF NOT EXISTS responses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    response_option_id INTEGER REFERENCES response_options(id) ON DELETE SET NULL,
    open_response TEXT,
    justification TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de evaluaciones completas
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_score INTEGER NOT NULL,
    max_possible_score INTEGER NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    classification TEXT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de administradores
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_questions_module_id ON questions(module_id);
CREATE INDEX IF NOT EXISTS idx_responses_user_id ON responses(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_question_id ON responses(question_id);
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON assessments(completed_at DESC);

-- Insertar opciones de respuesta predeterminadas
INSERT INTO response_options (id, option_text, points, excludes_from_calculation) VALUES
    (101, 'Sí - Básico', 1, FALSE),
    (102, 'Sí - Intermedio', 2, FALSE),
    (103, 'Sí - Avanzado', 3, FALSE),
    (104, 'No', 0, FALSE),
    (105, 'No aplica', 0, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Insertar usuario administrador por defecto (password: admin123)
-- Hash generado con bcrypt para la contraseña 'admin123'
INSERT INTO admins (username, password_hash, role) VALUES
    ('admin', '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'super_admin')
ON CONFLICT (username) DO NOTHING;

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE 'Base de datos inicializada correctamente';
    RAISE NOTICE 'Usuario: escazu_user';
    RAISE NOTICE 'Base de datos: herramienta_escazu';
    RAISE NOTICE 'Puerto: 5432';
END $$;
