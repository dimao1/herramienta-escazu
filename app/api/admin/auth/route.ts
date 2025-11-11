import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Buscar el usuario administrador
    const admin = await prisma.admin.findFirst({
      where: {
        username: username,
        passwordHash: password, // En producción usar bcrypt
      },
    });

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
