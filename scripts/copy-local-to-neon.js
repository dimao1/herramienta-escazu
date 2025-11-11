// Script para copiar datos de la base de datos local a Neon
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Leer variables de entorno
function loadEnv(filename) {
  const envPath = path.join(__dirname, "..", filename);
  const envVars = {};
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
      line = line.trim();
      if (line && !line.startsWith("#")) {
        const [key, ...valueParts] = line.split("=");
        const value = valueParts.join("=").replace(/^"|"$/g, '');
        envVars[key] = value;
      }
    });
  }
  return envVars;
}

async function copyData() {
  console.log("📦 Copiando datos de Local a Neon...\n");

  // Conexión local
  const localEnv = loadEnv(".env.local");
  const localPool = new Pool({
    connectionString: localEnv.DATABASE_URL
  });

  // Conexión Neon
  const neonEnv = loadEnv(".env.vercel");
  const neonPool = new Pool({
    connectionString: neonEnv.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // 1. Copiar módulos
    console.log("📋 Copiando módulos...");
    const modules = await localPool.query("SELECT * FROM modules ORDER BY order_index");
    for (const module of modules.rows) {
      await neonPool.query(
        `INSERT INTO modules (id, name, description, order_index) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (id) DO UPDATE SET name = $2, description = $3, order_index = $4`,
        [module.id, module.name, module.description, module.order_index]
      );
    }
    console.log(`✅ ${modules.rows.length} módulos copiados`);

    // 2. Copiar preguntas
    console.log("\n📋 Copiando preguntas...");
    const questions = await localPool.query("SELECT * FROM questions ORDER BY module_id, order_index");
    for (const question of questions.rows) {
      // Convertir recommendation (string JSON) a recommendations (JSONB)
      let recommendations = null;
      if (question.recommendation) {
        try {
          recommendations = typeof question.recommendation === 'string' 
            ? JSON.parse(question.recommendation) 
            : question.recommendation;
        } catch (e) {
          console.warn(`⚠️  Error parseando recommendation para pregunta ${question.id}`);
        }
      }
      
      await neonPool.query(
        `INSERT INTO questions (id, module_id, question_text, question_type, order_index, recommendations) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         ON CONFLICT (id) DO UPDATE SET 
         module_id = $2, question_text = $3, question_type = $4, order_index = $5, recommendations = $6`,
        [question.id, question.module_id, question.question_text, question.question_type, question.order_index, recommendations]
      );
    }
    console.log(`✅ ${questions.rows.length} preguntas copiadas`);

    // 3. Copiar opciones de respuesta
    console.log("\n📋 Copiando opciones de respuesta...");
    const options = await localPool.query("SELECT * FROM response_options ORDER BY id");
    for (const option of options.rows) {
      await neonPool.query(
        `INSERT INTO response_options (id, option_text, points, excludes_from_calculation) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (id) DO UPDATE SET option_text = $2, points = $3, excludes_from_calculation = $4`,
        [option.id, option.option_text, option.points, option.excludes_from_calculation]
      );
    }
    console.log(`✅ ${options.rows.length} opciones copiadas`);

    // 4. Copiar admin (si existe en local)
    console.log("\n👤 Copiando usuarios admin...");
    const admins = await localPool.query("SELECT * FROM admins");
    for (const admin of admins.rows) {
      await neonPool.query(
        `INSERT INTO admins (username, password_hash) 
         VALUES ($1, $2) 
         ON CONFLICT (username) DO UPDATE SET password_hash = $2`,
        [admin.username, admin.password_hash]
      );
    }
    console.log(`✅ ${admins.rows.length} admins copiados`);

    console.log("\n🎉 ¡Datos copiados exitosamente a Neon!");
    
    // Mostrar resumen
    const stats = await neonPool.query(`
      SELECT 
        (SELECT COUNT(*) FROM modules) as modules,
        (SELECT COUNT(*) FROM questions) as questions,
        (SELECT COUNT(*) FROM response_options) as response_options,
        (SELECT COUNT(*) FROM admins) as admins
    `);
    
    console.log("\n📊 Resumen en Neon:");
    console.log(`   - Módulos: ${stats.rows[0].modules}`);
    console.log(`   - Preguntas: ${stats.rows[0].questions}`);
    console.log(`   - Opciones de respuesta: ${stats.rows[0].response_options}`);
    console.log(`   - Administradores: ${stats.rows[0].admins}`);

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await localPool.end();
    await neonPool.end();
  }
}

copyData();
