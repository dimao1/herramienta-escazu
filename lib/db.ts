// Utilidad para conexión a base de datos que funciona tanto local como en Vercel
import { Pool } from "pg";

// Detectar si estamos usando Neon (producción) o PostgreSQL local
const isNeonDatabase = process.env.DATABASE_URL?.includes("neon.tech") || false;

// Configurar pool con opciones apropiadas para cada ambiente
const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Configuración específica para serverless (Vercel)
  max: isNeonDatabase ? 1 : 10, // En serverless, usar conexiones mínimas
  idleTimeoutMillis: isNeonDatabase ? 0 : 30000,
  connectionTimeoutMillis: isNeonDatabase ? 10000 : 2000,
});

export { dbPool as pool, isNeonDatabase as isNeon };
export default dbPool;
