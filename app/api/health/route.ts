import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    // Verificar variable de entorno
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: "error",
        message: "DATABASE_URL no está configurado",
        hint: "Verifica que .env.local existe y contiene DATABASE_URL",
      }, { status: 500 });
    }

    if (process.env.DATABASE_URL.includes("placeholder")) {
      return NextResponse.json({
        status: "warning",
        message: "DATABASE_URL tiene valores placeholder",
        hint: "Actualiza .env.local con la cadena de conexión correcta",
        currentUrl: "postgresql://placeholder:***@placeholder.neon.tech/...",
      }, { status: 500 });
    }

    // Intentar conectar a la base de datos
    const sql = neon(process.env.DATABASE_URL);
    
    // Verificar conexión simple
    const result = await sql`SELECT NOW() as current_time`;
    
    // Verificar que las tablas existen
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

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
      database: process.env.DATABASE_URL.includes("localhost") ? "PostgreSQL Local" : "PostgreSQL Remoto",
      timestamp: result[0].current_time,
      tables: tableNames,
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
