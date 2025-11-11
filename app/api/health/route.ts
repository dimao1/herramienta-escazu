import { NextResponse } from "next/server";
import { pool, isNeon } from "@/lib/db";

export async function GET() {
  try {
    // Verificar variable de entorno
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: "error",
        message: "DATABASE_URL no está configurado",
        hint: "Verifica las variables de entorno en Vercel",
      }, { status: 500 });
    }

    if (process.env.DATABASE_URL.includes("placeholder")) {
      return NextResponse.json({
        status: "warning",
        message: "DATABASE_URL tiene valores placeholder",
        hint: "Actualiza la variable de entorno con la cadena de conexión correcta",
        currentUrl: "postgresql://placeholder:***@placeholder.neon.tech/...",
      }, { status: 500 });
    }
    
    // Verificar conexión simple
    const timeResult = await pool.query("SELECT NOW() as current_time");
    
    // Verificar que las tablas existen
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    const tables = tablesResult.rows;

    const tableNames = tables.map((t: any) => t.table_name);
    const requiredTables = [
      "users",
      "modules",
      "questions",
      "response_options",
      "responses",
      "assessments",
    ];

    const missingTables = requiredTables.filter(t => !tableNames.includes(t));

    if (missingTables.length > 0) {
      return NextResponse.json({
        status: "error",
        message: "Faltan tablas en la base de datos",
        missingTables,
        existingTables: tableNames,
        hint: "Ejecuta el script init.sql o reinicia Docker con: docker compose down -v && docker compose up -d",
      }, { status: 500 });
    }

    return NextResponse.json({
      status: "ok",
      message: "Base de datos conectada correctamente",
      database: isNeon ? "Neon Database (Serverless)" : "PostgreSQL Local",
      environment: process.env.VERCEL ? "Vercel" : "Local",
      timestamp: timeResult.rows[0].current_time,
      tables: tableNames,
      poolConfig: {
        max: isNeon ? 1 : 10,
        isNeon: isNeon,
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    let hint = "";
    if (errorMessage.includes("ECONNREFUSED") || errorMessage.includes("connect")) {
      hint = "No se puede conectar a PostgreSQL. Verifica que Docker esté ejecutándose con: docker compose ps";
    } else if (errorMessage.includes("password")) {
      hint = "Error de autenticación. Verifica las credenciales en .env.local";
    } else if (errorMessage.includes("database") && errorMessage.includes("does not exist")) {
      hint = "La base de datos no existe. Ejecuta: docker compose down -v && docker compose up -d";
    }

    return NextResponse.json({
      status: "error",
      message: "Error al conectar con la base de datos",
      error: errorMessage,
      hint: hint || "Revisa los logs del servidor para más detalles",
    }, { status: 500 });
  }
}
