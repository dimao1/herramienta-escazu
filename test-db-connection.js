// Script para probar la conexión a la base de datos
const { neon } = require("@neondatabase/serverless");
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
  console.log("🔍 Probando conexión a la base de datos...\n");
  console.log("📌 DATABASE_URL:", process.env.DATABASE_URL ? "✅ Configurada" : "❌ No configurada");
  
  if (!process.env.DATABASE_URL) {
    console.error("\n❌ ERROR: DATABASE_URL no está configurada en .env.local");
    process.exit(1);
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Probar consulta simple
    console.log("\n🔄 Ejecutando consulta de prueba...");
    const result = await sql`SELECT NOW() as current_time, current_database() as database`;
    
    console.log("\n✅ ¡Conexión exitosa!");
    console.log("📅 Hora del servidor:", result[0].current_time);
    console.log("🗄️  Base de datos:", result[0].database);
    
    // Verificar tablas existentes
    console.log("\n🔍 Verificando tablas existentes...");
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    if (tables.length > 0) {
      console.log("📊 Tablas encontradas:");
      tables.forEach(t => console.log(`   - ${t.table_name}`));
    } else {
      console.log("⚠️  No se encontraron tablas. Ejecuta el script init.sql para crear la estructura.");
    }
    
  } catch (error) {
    console.error("\n❌ Error al conectar a la base de datos:");
    console.error("Mensaje:", error.message);
    console.error("\nDetalles:", error);
    process.exit(1);
  }
}

testConnection();
