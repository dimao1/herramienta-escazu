import { type NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const result = await pool.query(
      `SELECT username
       FROM admins
       WHERE username = $1 AND password_hash = $2
       LIMIT 1`,
      [username, password],
    );

    const admin = result.rows[0];

    if (!admin) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    // En producción, aquí deberías usar JWT o similar
    return NextResponse.json({
      success: true,
      user: {
        username: admin.username,
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
