// Script para crear un usuario administrador
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

async function createAdmin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("🔐 Creando usuario administrador...\n");
    
    // Por ahora, vamos a usar password en texto plano para desarrollo
    // En producción deberías usar bcrypt
    const username = "admin";
    const password = "admin123";
    const role = "super_admin";
    
    // Eliminar admin existente
    await pool.query("DELETE FROM admins WHERE username = $1", [username]);
    
    // Crear nuevo admin (sin hash por ahora, solo para desarrollo)
    await pool.query(
      `INSERT INTO admins (username, password_hash, role) 
       VALUES ($1, $2, $3)`,
      [username, password, role]
    );
    
    console.log("✅ Usuario administrador creado:\n");
    console.log("   👤 Usuario:", username);
    console.log("   🔑 Contraseña:", password);
    console.log("   👑 Rol:", role);
    console.log("\n⚠️  IMPORTANTE: Esta es una configuración de desarrollo");
    console.log("   En producción debes usar bcrypt para las contraseñas\n");
    
    await pool.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
    await pool.end();
    process.exit(1);
  }
}

createAdmin();
