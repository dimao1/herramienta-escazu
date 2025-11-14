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

    // Verificar conexión y contar registros en cada tabla usando SQL crudo
    const [
      usersRes,
      modulesRes,
      questionsRes,
      responseOptionsRes,
      responsesRes,
      assessmentsRes,
      adminsRes,
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) AS count FROM users"),
      pool.query("SELECT COUNT(*) AS count FROM modules"),
      pool.query("SELECT COUNT(*) AS count FROM questions"),
      pool.query("SELECT COUNT(*) AS count FROM response_options"),
      pool.query("SELECT COUNT(*) AS count FROM responses"),
      pool.query("SELECT COUNT(*) AS count FROM assessments"),
      pool.query("SELECT COUNT(*) AS count FROM admins"),
    ]);

    return NextResponse.json({
      status: "ok",
      message: "Base de datos conectada correctamente con Prisma",
      database: isNeon ? "Neon Database (Serverless)" : "PostgreSQL Local",
      environment: process.env.VERCEL ? "Vercel" : "Local",
      timestamp: new Date().toISOString(),
      tables: {
        users: Number(usersRes.rows[0]?.count ?? 0),
        modules: Number(modulesRes.rows[0]?.count ?? 0),
        questions: Number(questionsRes.rows[0]?.count ?? 0),
        response_options: Number(responseOptionsRes.rows[0]?.count ?? 0),
        responses: Number(responsesRes.rows[0]?.count ?? 0),
        assessments: Number(assessmentsRes.rows[0]?.count ?? 0),
        admins: Number(adminsRes.rows[0]?.count ?? 0),
      },
      prismaVersion: null,
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
