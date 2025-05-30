"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface QuizLayoutProps {
  children: React.ReactNode
  currentQuestion: number
  totalQuestions: number
  score?: number
  title: string
}

export function QuizLayout({ children, currentQuestion, totalQuestions, score = 0, title }: QuizLayoutProps) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-ambiente.png"
              alt="Ministerio de Ambiente"
              width={120}
              height={80}
              className="object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-green-800">
                Herramienta Diagnóstica para identificar mejoras en la
              </h1>
              <h2 className="text-lg font-semibold text-green-700">
                Transparencia, Participación y Evaluación Ambiental
              </h2>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {currentQuestion} de {totalQuestions}
            </div>
            <div className="text-lg font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-md border border-green-200 mt-1">
              Puntuación: {score}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
          <div className="text-center text-sm text-gray-600 mt-2">Progreso: {Math.round(progress)}%</div>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <h3 className="text-xl font-semibold text-center">{title}</h3>
          </CardHeader>
          <CardContent className="p-8">{children}</CardContent>
        </Card>
      </div>
    </div>
  )
}
