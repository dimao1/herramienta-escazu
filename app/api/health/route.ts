import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const isNeon = process.env.DATABASE_URL?.includes("neon.tech") || false;
    
    // Verificar conexión y contar registros en cada tabla
    const [
      userCount,
      moduleCount,
      questionCount,
      responseOptionCount,
      responseCount,
      assessmentCount,
      adminCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.module.count(),
      prisma.question.count(),
      prisma.responseOption.count(),
      prisma.response.count(),
      prisma.assessment.count(),
      prisma.admin.count(),
    ]);

    return NextResponse.json({
      status: "ok",
      message: "Base de datos conectada correctamente con Prisma",
      database: isNeon ? "Neon Database (Serverless)" : "PostgreSQL Local",
      environment: process.env.VERCEL ? "Vercel" : "Local",
      timestamp: new Date().toISOString(),
      tables: {
        users: userCount,
        modules: moduleCount,
        questions: questionCount,
        response_options: responseOptionCount,
        responses: responseCount,
        assessments: assessmentCount,
        admins: adminCount,
      },
      prismaVersion: "6.19.0",
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
