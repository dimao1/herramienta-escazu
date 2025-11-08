"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Users, Scale } from "lucide-react";

interface IntroductionPageProps {
  onContinue: () => void;
}

export function IntroductionPage({ onContinue }: IntroductionPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardTitle className="text-3xl text-center font-bold">
            Bienvenida/o a la Herramienta de Autodiagnóstico Ruta de Escazú 567
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {/* Descripción principal */}
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Esta herramienta hace parte del{" "}
              <strong>
                Programa Sistema Nacional de Control Social Ambiental en Colombia
                #AlertaPorMiAmbiente
              </strong>
              , una estrategia orientada a fortalecer las capacidades institucionales
              para la implementación del Acuerdo de Escazú y la promoción del Gobierno
              Abierto Ambiental en el país.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Su propósito es apoyar a las entidades del{" "}
              <strong>Sistema Nacional Ambiental (SINA)</strong> en la identificación de
              fortalezas, desafíos y oportunidades de mejora en materia de transparencia,
              acceso a la información, participación ciudadana y justicia ambiental.
            </p>
          </div>

          {/* Módulos */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              La herramienta está conformada por tres módulos:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-800">Módulo 1.</strong>
                  <span className="text-gray-700">
                    {" "}
                    Acceso a la Información Ambiental y Procedimientos de Respuesta.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-800">Módulo 2.</strong>
                  <span className="text-gray-700">
                    {" "}
                    Divulgación y publicación de información ambiental.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-800">Módulo 3.</strong>
                  <span className="text-gray-700">
                    {" "}
                    Participación Ciudadana en la Toma de Decisiones Ambientales.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Objetivo */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-700 leading-relaxed">
                A través de esta herramienta, cada entidad podrá evaluar su nivel de
                avance en estas dimensiones, identificando prácticas, vacíos y
                oportunidades de fortalecimiento. Los resultados servirán como insumo
                para definir acciones de mejora, fortalecer las capacidades
                institucionales y promover procesos de aprendizaje colaborativo entre los
                actores del SINA.
              </p>
            </div>
          </div>

          {/* Botón de continuar */}
          <div className="pt-4">
            <Button
              onClick={onContinue}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
            >
              Continuar al Registro
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
