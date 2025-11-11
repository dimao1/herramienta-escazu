const {Pool} = require('pg');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.vercel');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/DATABASE_URL="(.+?)"/);
  return match ? match[1] : null;
}

async function checkSchema() {
  const dbUrl = loadEnv();
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  const result = await pool.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns 
    WHERE table_name='questions' 
    ORDER BY ordinal_position
  `);

  console.log('Columnas en tabla questions (Neon):');
  console.table(result.rows);
  
  await pool.end();
}

checkSchema();
