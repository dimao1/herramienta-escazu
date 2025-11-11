import { type NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require",
});

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Buscar el usuario administrador en la tabla correcta
    const result = await pool.query(
      "SELECT * FROM admins WHERE username = $1 AND password_hash = $2",
      [username, password]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    const adminUser = result.rows[0];

    // En un entorno de producción, aquí usarías JWT o sessions con bcrypt
    return NextResponse.json({
      success: true,
      admin: {
        id: adminUser.id,
        username: adminUser.username,
        role: adminUser.role,
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
