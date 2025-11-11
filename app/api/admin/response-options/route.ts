import { type NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require",
});

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM response_options ORDER BY id"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo opciones de respuesta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { option_text, points, excludes_from_calculation } =
      await request.json();

    const result = await pool.query(
      "INSERT INTO response_options (option_text, points, excludes_from_calculation) VALUES ($1, $2, $3) RETURNING *",
      [option_text, points, excludes_from_calculation]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creando opción de respuesta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, option_text, points, excludes_from_calculation } =
      await request.json();

    const result = await pool.query(
      "UPDATE response_options SET option_text = $1, points = $2, excludes_from_calculation = $3 WHERE id = $4 RETURNING *",
      [option_text, points, excludes_from_calculation, id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error actualizando opción de respuesta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await pool.query("DELETE FROM response_options WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error eliminando opción de respuesta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
