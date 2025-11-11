// Script para verificar las credenciales de administrador
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Leer .env.local
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

async function checkAdmin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("🔍 Verificando credenciales de administrador...\n");
    
    const result = await pool.query(
      "SELECT id, username, role, created_at FROM admins ORDER BY id"
    );
    
    if (result.rows.length === 0) {
      console.log("⚠️  No hay administradores registrados");
      console.log("\n💡 Las credenciales por defecto según init.sql son:");
      console.log("   Usuario: admin");
      console.log("   Contraseña: admin123");
      console.log("\n⚠️  PERO el hash en init.sql es placeholder, necesitas crear un admin real");
    } else {
      console.log("👥 Administradores registrados:\n");
      result.rows.forEach(admin => {
        console.log(`   ID: ${admin.id}`);
        console.log(`   Usuario: ${admin.username}`);
        console.log(`   Rol: ${admin.role}`);
        console.log(`   Creado: ${admin.created_at}`);
        console.log();
      });
      
      console.log("🔐 Información de credenciales:");
      console.log("   Las contraseñas están encriptadas con bcrypt");
      console.log("   Si el hash es placeholder (XXX...), necesitas crear un admin válido");
    }
    
    await pool.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
    await pool.end();
    process.exit(1);
  }
}

checkAdmin();
