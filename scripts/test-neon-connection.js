// Script para probar la conexión a Neon Database
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
        const value = valueParts.join("=").replace(/^"|"$/g, '');
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

async function testNeonConnection() {
  console.log("🔍 Probando conexión a Neon Database...\n");
  console.log("📌 DATABASE_URL:", process.env.DATABASE_URL ? "✅ Configurada" : "❌ No configurada");
  
  if (!process.env.DATABASE_URL) {
    console.error("\n❌ ERROR: DATABASE_URL no está configurada");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('neon.tech') ? { rejectUnauthorized: false } : false
  });

  try {
    console.log("🔌 Conectando...");
    const result = await pool.query("SELECT NOW() as current_time, current_database() as database, version()");
    
    console.log("\n✅ Conexión exitosa!");
    console.log("\n📊 Información de la base de datos:");
    console.log(`   Hora actual: ${result.rows[0].current_time}`);
    console.log(`   Base de datos: ${result.rows[0].database}`);
    console.log(`   Versión: ${result.rows[0].version.split(' ').slice(0, 2).join(' ')}`);
    
    // Verificar tablas
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log("\n📋 Tablas en la base de datos:");
    if (tables.rows.length > 0) {
      tables.rows.forEach(row => console.log(`   - ${row.table_name}`));
    } else {
      console.log("   ⚠️  No hay tablas. Ejecuta 'npm run init:neon' para inicializar.");
    }

  } catch (error) {
    console.error("\n❌ Error de conexión:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testNeonConnection();
