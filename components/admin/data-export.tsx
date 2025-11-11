"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, Database } from "lucide-react";

export function DataExport() {
  const [loading, setLoading] = useState(false);

  const exportToCSV = async (endpoint: string, filename: string) => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      // Convertir a CSV con formato correcto
      if (data.length > 0) {
        // Función para escapar valores CSV
        const escapeCSV = (value: any) => {
          if (value === null || value === undefined) return '';
          const stringValue = String(value);
          // Si contiene coma, comilla doble o salto de línea, envolver en comillas
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        };

        // Generar headers
        const headers = Object.keys(data[0]).map(escapeCSV).join(",");
        
        // Generar rows
        const rows = data
          .map((row: any) => 
            Object.values(row).map(escapeCSV).join(",")
          )
          .join("\n");
        
        const csv = `${headers}\n${rows}`;

        // Agregar BOM UTF-8 para que Excel reconozca la codificación
        const BOM = '\uFEFF';
        const csvWithBOM = BOM + csv;

        // Descargar archivo con codificación UTF-8
        const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error al exportar los datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Exportar Datos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Evaluaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Exportar todas las evaluaciones completadas con resultados y datos
              del usuario.
            </p>
            <Button
              onClick={() =>
                exportToCSV("/api/admin/assessments", "evaluaciones")
              }
              disabled={loading}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Preguntas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Exportar todas las preguntas con sus módulos y recomendaciones.
            </p>
            <Button
              onClick={() => exportToCSV("/api/admin/questions", "preguntas")}
              disabled={loading}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Módulos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Exportar todos los módulos del diagnóstico.
            </p>
            <Button
              onClick={() => exportToCSV("/api/admin/modules", "modulos")}
              disabled={loading}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
