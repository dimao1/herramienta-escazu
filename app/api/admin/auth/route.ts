import { type NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(
  process.env.DATABASE_URL ||
    "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require",
);

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Buscar el usuario administrador (usando password_hash en lugar de password)
    const adminUser = await sql`
      SELECT * FROM admin_users 
      WHERE username = ${username} AND password_hash = ${password}
    `;

    if (adminUser.length === 0) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    // En un entorno de producción, aquí usarías JWT o sessions
    return NextResponse.json({
      success: true,
      admin: {
        id: adminUser[0].id,
        username: adminUser[0].username,
        email: adminUser[0].email,
        role: adminUser[0].role,
      },
    });
  } catch (error) {
    console.error("Error en autenticación:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
