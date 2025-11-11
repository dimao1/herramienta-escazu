// Script para poblar la base de datos con módulos, preguntas y opciones de respuesta
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Cargar datos parseando el archivo TypeScript
function loadDataFromTS() {
  const tsPath = path.join(__dirname, "../lib/questions-data.ts");
  const content = fs.readFileSync(tsPath, "utf-8");
  
  // Evaluar el código TypeScript (simplificado)
  const modulesMatch = content.match(/export const modulesData = (\[[\s\S]*?\]);/);
  const questionsMatch = content.match(/export const questionsData = (\[[\s\S]*?\]);/);
  const optionsMatch = content.match(/export const responseOptionsData = (\[[\s\S]*?\]);/);
  
  if (!modulesMatch || !questionsMatch || !optionsMatch) {
    throw new Error("No se pudieron extraer los datos del archivo TypeScript");
  }
  
  // Limpiar y evaluar JSON (removiendo 'as const' y otros elementos TS)
  const cleanForEval = (str) => str
    .replace(/as const/g, '')
    .replace(/: "(\w+)" as const/g, ': "$1"');
  
  const modulesData = eval(cleanForEval(modulesMatch[1]));
  const questionsData = eval(cleanForEval(questionsMatch[1]));
  const responseOptionsData = eval(cleanForEval(optionsMatch[1]));
  
  return { modulesData, questionsData, responseOptionsData };
}

const { modulesData, questionsData, responseOptionsData } = loadDataFromTS();

// Leer .env.local
function loadEnv() {
  const envPath = path.join(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
      line = line.trim();
      if (line && !line.startsWith("#")) {
        const [key, ...valueParts] = line.split("=");
        const value = valueParts.join("=");
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

async function seedDatabase() {
  console.log("🌱 Iniciando población de la base de datos...\n");

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Comenzar transacción
    await pool.query("BEGIN");

    // 1. Limpiar datos existentes (en orden por dependencias)
    console.log("🧹 Limpiando datos existentes...");
    await pool.query("DELETE FROM responses");
    await pool.query("DELETE FROM assessments");
    await pool.query("DELETE FROM users WHERE id > 0");
    await pool.query("DELETE FROM questions");
    await pool.query("DELETE FROM modules");
    await pool.query("DELETE FROM response_options WHERE id > 0");
    console.log("✅ Datos limpiados\n");

    // 2. Insertar opciones de respuesta
    console.log("📝 Insertando opciones de respuesta...");
    for (const option of responseOptionsData) {
      await pool.query(
        `INSERT INTO response_options (id, option_text, points, excludes_from_calculation) 
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE 
         SET option_text = $2, points = $3, excludes_from_calculation = $4`,
        [option.id, option.option_text, option.points, option.excludes_from_calculation]
      );
    }
    console.log(`✅ ${responseOptionsData.length} opciones de respuesta insertadas\n`);

    // 3. Insertar módulos
    console.log("📚 Insertando módulos...");
    for (const module of modulesData) {
      await pool.query(
        `INSERT INTO modules (id, name, description, order_index) 
         VALUES ($1, $2, $3, $4)`,
        [module.id, module.name, module.description, module.order_index]
      );
    }
    console.log(`✅ ${modulesData.length} módulos insertados\n`);

    // 4. Insertar preguntas
    console.log("❓ Insertando preguntas...");
    for (const question of questionsData) {
      // Convertir recommendations object a JSON string
      const recommendationsJson = JSON.stringify(question.recommendations);
      
      await pool.query(
        `INSERT INTO questions (id, module_id, question_text, question_type, order_index, recommendation) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          question.id,
          question.module_id,
          question.question_text,
          question.question_type,
          question.order_index,
          recommendationsJson
        ]
      );
    }
    console.log(`✅ ${questionsData.length} preguntas insertadas\n`);

    // Confirmar transacción
    await pool.query("COMMIT");

    // Verificar resultados
    console.log("📊 Verificando datos insertados...");
    const moduleCount = await pool.query("SELECT COUNT(*) as count FROM modules");
    const questionCount = await pool.query("SELECT COUNT(*) as count FROM questions");
    const optionCount = await pool.query("SELECT COUNT(*) as count FROM response_options");

    console.log(`   Módulos: ${moduleCount.rows[0].count}`);
    console.log(`   Preguntas: ${questionCount.rows[0].count}`);
    console.log(`   Opciones de respuesta: ${optionCount.rows[0].count}`);

    console.log("\n✅ Base de datos poblada exitosamente!");

    await pool.end();
    process.exit(0);

  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("\n❌ Error poblando la base de datos:");
    console.error(error);
    await pool.end();
    process.exit(1);
  }
}

seedDatabase();
