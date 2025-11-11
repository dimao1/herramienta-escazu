// Script para inicializar la base de datos Neon con las tablas y datos
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Leer .env.vercel
function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.vercel");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
      line = line.trim();
      if (line && !line.startsWith("#")) {
        const [key, ...valueParts] = line.split("=");
        const value = valueParts.join("=").replace(/^"|"$/g, ''); // Remover comillas
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

async function initializeNeonDB() {
  console.log("🚀 Inicializando base de datos Neon...\n");
  console.log("📌 DATABASE_URL:", process.env.DATABASE_URL ? "✅ Configurada" : "❌ No configurada");
  
  if (!process.env.DATABASE_URL) {
    console.error("\n❌ ERROR: DATABASE_URL no está configurada en .env.vercel");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('neon.tech') ? { rejectUnauthorized: false } : false
  });

  try {
    console.log("🔌 Conectando a Neon Database...");
    await pool.query("SELECT NOW()");
    console.log("✅ Conexión exitosa\n");

    // Leer el script SQL de inicialización
    const sqlPath = path.join(__dirname, "..", "init.sql");
    const sqlScript = fs.readFileSync(sqlPath, "utf-8");

    console.log("📝 Ejecutando script de inicialización...");
    await pool.query(sqlScript);
    console.log("✅ Tablas creadas exitosamente\n");

    // Poblar con datos de questions-data.ts
    console.log("📊 Poblando base de datos con datos iniciales...");
    console.log("ℹ️  Ejecuta 'npm run db:seed' localmente y luego exporta/importa los datos");
    console.log("    O usa el panel de admin para agregar módulos y preguntas manualmente\n");

    // Crear admin por defecto
    console.log("\n👤 Creando usuario administrador...");
    await pool.query(
      `INSERT INTO admins (username, password_hash) 
       VALUES ($1, $2) 
       ON CONFLICT (username) DO NOTHING`,
      ['admin', 'admin123']
    );
    console.log("✅ Usuario admin creado (username: admin, password: admin123)");

    console.log("\n🎉 Base de datos Neon inicializada correctamente!");
    console.log("\n📋 Resumen:");
    
    const stats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM modules) as modules,
        (SELECT COUNT(*) FROM questions) as questions,
        (SELECT COUNT(*) FROM response_options) as response_options,
        (SELECT COUNT(*) FROM admins) as admins
    `);
    
    console.log(`   - Módulos: ${stats.rows[0].modules}`);
    console.log(`   - Preguntas: ${stats.rows[0].questions}`);
    console.log(`   - Opciones de respuesta: ${stats.rows[0].response_options}`);
    console.log(`   - Administradores: ${stats.rows[0].admins}`);

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initializeNeonDB();
