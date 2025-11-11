// Utilidad para conexión a base de datos que funciona tanto local como en Vercel
import { Pool } from "pg";

// Detectar si estamos usando Neon (producción) o PostgreSQL local
export const isNeon = process.env.DATABASE_URL?.includes("neon.tech") || false;

// Configurar pool con opciones apropiadas para cada ambiente
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Configuración específica para serverless (Vercel)
  max: isNeon ? 1 : 10, // En serverless, usar conexiones mínimas
  idleTimeoutMillis: isNeon ? 0 : 30000,
  connectionTimeoutMillis: isNeon ? 10000 : 2000,
});

export default pool;
