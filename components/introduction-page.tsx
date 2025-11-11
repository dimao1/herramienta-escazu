"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Users, Scale } from "lucide-react";
import Image from "next/image";

interface IntroductionPageProps {
  onContinue: () => void;
}

export function IntroductionPage({ onContinue }: IntroductionPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        <Card className="w-full max-w-5xl shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 md:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 md:px-6">
              <Image
                src="/logo-ambiente.png"
                alt="Ministerio de Ambiente"
                width={110}
                height={73}
                className="object-contain flex-shrink-0 w-16 h-auto sm:w-20 md:w-24 lg:w-28"
              />
              <div className="text-center flex-grow">
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                  Herramienta de Autodiagnóstico
                </CardTitle>
                <p className="text-base sm:text-lg md:text-xl font-semibold text-green-100">
                  Ruta de Escazú 567
                </p>
              </div>
            <Image
              src="/logo-ruta-567-escazu.png"
              alt="Logo Ruta 567 Escazú"
              width={100}
              height={100}
              className="object-contain flex-shrink-0 w-16 h-auto sm:w-20 md:w-24 lg:w-28"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
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
          <div className="bg-green-50 p-4 md:p-6 rounded-lg border border-green-200">
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
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg border border-blue-200">
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
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold"
            >
              Continuar al Registro
            </Button>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
