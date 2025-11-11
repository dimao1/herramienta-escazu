// Script para probar la conexión con pg nativo
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Leer .env.local manualmente
function loadEnv() {
  const envPath = path.join(__dirname, ".env.local");
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

async function testConnection() {
  console.log("🔍 Probando conexión a PostgreSQL local...\n");
  console.log("📌 DATABASE_URL:", process.env.DATABASE_URL ? "✅ Configurada" : "❌ No configurada");
  
  if (!process.env.DATABASE_URL) {
    console.error("\n❌ ERROR: DATABASE_URL no está configurada en .env.local");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("\n🔄 Ejecutando consulta de prueba...");
    const result = await pool.query("SELECT NOW() as current_time, current_database() as database, version()");
    
    console.log("\n✅ ¡Conexión exitosa!");
    console.log("📅 Hora del servidor:", result.rows[0].current_time);
    console.log("🗄️  Base de datos:", result.rows[0].database);
    console.log("📦 Versión PostgreSQL:", result.rows[0].version.split(" ")[0] + " " + result.rows[0].version.split(" ")[1]);
    
    // Verificar tablas existentes
    console.log("\n🔍 Verificando tablas existentes...");
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tables.rows.length > 0) {
      console.log("📊 Tablas encontradas:");
      tables.rows.forEach(t => console.log(`   - ${t.table_name}`));
      
      // Contar registros en cada tabla
      console.log("\n📈 Conteo de registros:");
      for (const table of tables.rows) {
        const count = await pool.query(`SELECT COUNT(*) as count FROM ${table.table_name}`);
        console.log(`   - ${table.table_name}: ${count.rows[0].count} registros`);
      }
    } else {
      console.log("⚠️  No se encontraron tablas.");
      console.log("💡 Ejecuta el script init.sql para crear la estructura:");
      console.log("   docker exec -i herramienta-escazu-db psql -U escazu_user -d herramienta_escazu < init.sql");
    }
    
    await pool.end();
    console.log("\n✅ Prueba completada exitosamente");
    
  } catch (error) {
    console.error("\n❌ Error al conectar a la base de datos:");
    console.error("Código:", error.code);
    console.error("Mensaje:", error.message);
    
    if (error.code === "ECONNREFUSED") {
      console.error("\n💡 Solución: El contenedor Docker no está corriendo o no está listo.");
      console.error("   Ejecuta: docker compose up -d");
      console.error("   Espera unos segundos y vuelve a intentar.");
    }
    
    await pool.end();
    process.exit(1);
  }
}

testConnection();
