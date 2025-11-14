// scripts/init-db.js
// Inicializa la base de datos local ejecutando primero schema.sql y luego inserts.sql (tal cual están)

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config();

async function runSqlFile(client, filePath) {
  console.log(`📄 Ejecutando archivo SQL completo: ${filePath}`);
  const sql = fs.readFileSync(filePath, "utf8");
  await client.query(sql);
}

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ DATABASE_URL no está definida en .env");
    process.exit(1);
  }

  const client = new Client({ connectionString: dbUrl });

  try {
    console.log("🔌 Conectando a la base de datos...");
    await client.connect();

    const scriptsDir = __dirname;
    const schemaPath = path.join(scriptsDir, "schema.sql");
    const insertsPath = path.join(scriptsDir, "inserts.sql");

    if (!fs.existsSync(schemaPath)) {
      throw new Error(`No se encontró schema.sql en ${schemaPath}`);
    }
    if (!fs.existsSync(insertsPath)) {
      throw new Error(`No se encontró inserts.sql en ${insertsPath}`);
    }

    console.log("🚀 Iniciando inicialización de la base de datos...");

    // Ejecutar esquema (DROP/CREATE tablas)
    await runSqlFile(client, schemaPath);

    // Ejecutar inserts (datos exportados) tal cual están en el archivo
    await runSqlFile(client, insertsPath);

    console.log("✅ Base de datos inicializada correctamente (schema + inserts).");
  } catch (err) {
    console.error("❌ Error al inicializar la base de datos:", err.message || err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
