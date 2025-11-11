"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface QuizLayoutProps {
  children: React.ReactNode;
  currentQuestion: number;
  totalQuestions: number;
  score?: number;
  title: string;
}

export function QuizLayout({
  children,
  currentQuestion,
  totalQuestions,
  score = 0,
  title,
}: QuizLayoutProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 relative">
      {/* Marca de agua */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-5 z-0">
        <Image
          src="/logo-ruta-567-escazu.png"
          alt="Marca de agua Ruta 567"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur rounded-lg p-2 sm:p-3 md:p-4 mb-4 sm:mb-6 shadow-md">
          {/* Logos y Título */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4 mb-3 lg:mb-0">
            {/* Logo Ministerio en móvil */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-1 sm:gap-2">
              <Image
                src="/logo-ambiente.png"
                alt="Ministerio de Ambiente"
                width={120}
                height={80}
                className="object-contain w-12 h-auto sm:w-16 md:w-20 lg:w-28"
              />
              {/* Logos adicionales solo en móvil/tablet */}
              <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
                <Image
                  src="/logo-alerta-por-mi-ambiente.png"
                  alt="Alerta por mi Ambiente"
                  width={100}
                  height={100}
                  className="object-contain w-12 h-auto sm:w-16 md:w-20"
                />
                <Image
                  src="/logo-ruta-567-escazu.png"
                  alt="Logo Ruta 567 Escazú"
                  width={100}
                  height={100}
                  className="object-contain w-12 h-auto sm:w-16 md:w-20"
                />
              </div>
            </div>
            
            {/* Título - Oculto en móvil, visible en tablet+ */}
            <div className="hidden sm:flex items-center flex-grow justify-center px-2">
              <h1 className="text-sm md:text-base lg:text-lg font-bold text-green-800 text-center leading-tight">
                Herramienta Diagnóstica para identificar mejoras en la Transparencia, Participación y Evaluación Ambiental
              </h1>
            </div>
            
            {/* Logos en desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Image
                src="/logo-alerta-por-mi-ambiente.png"
                alt="Alerta por mi Ambiente"
                width={100}
                height={100}
                className="object-contain w-20 h-auto"
              />
              <Image
                src="/logo-ruta-567-escazu.png"
                alt="Logo Ruta 567 Escazú"
                width={100}
                height={100}
                className="object-contain w-20 h-auto"
              />
            </div>
          </div>
          
          {/* Progreso y Puntuación */}
          <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-gray-200">
            <div className="text-xs sm:text-sm text-gray-600">
              Pregunta {currentQuestion} de {totalQuestions}
            </div>
            <div className="text-sm sm:text-base font-semibold text-green-700 bg-green-50 px-2 sm:px-3 py-1 rounded-md border border-green-200">
              Puntuación: {score}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Progress value={progress} className="h-2 sm:h-3" />
          <motion.div 
            className="text-center text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2"
            key={currentQuestion}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Progreso: {Math.round(progress)}%
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
          <CardHeader className="bg-white border-b-2 border-gray-200 rounded-t-lg py-3 sm:py-4">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-center text-gray-800">{title}</h3>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 md:p-8">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
