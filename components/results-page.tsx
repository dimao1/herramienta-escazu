"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, RotateCcw } from "lucide-react"
import Image from "next/image"

interface User {
  id: number
  name: string
  contact: string
  entity: string
  municipality: string
  phone: string
  email: string
}

interface UserResponse {
  questionId: number
  response_option_id?: number
  open_response?: string
  justification?: string
}

interface Question {
  id: number
  module_id: number
  question_text: string
  question_type: "statement" | "open"
  order_index: number
  recommendations: Record<string, string>
}

interface ResponseOption {
  id: number
  option_text: string
  points: number
  excludes_from_calculation: boolean
}

interface Module {
  id: number
  name: string
  description: string
  order_index: number
}

interface ResultsPageProps {
  userId: number
  user: User
  responses: UserResponse[]
  questions: Question[]
  responseOptions: ResponseOption[]
  modules: Module[]
}

export function ResultsPage({ userId, user, responses, questions, responseOptions, modules }: ResultsPageProps) {
  const [assessment, setAssessment] = useState<{
    total_score: number
    max_possible_score: number
    percentage: number
    classification: string
  } | null>(null)

  useEffect(() => {
    console.log("Calculating assessment with:", { responses, responseOptions })
    calculateAssessment()
  }, [responses, questions, responseOptions])

  const calculateAssessment = () => {
    let totalScore = 0
    let questionsIncluded = 0

    console.log("Starting calculation with responses:", responses)

    responses.forEach((response, index) => {
      console.log(`Processing response ${index}:`, response)

      if (response.response_option_id) {
        const option = responseOptions.find((opt) => opt.id === response.response_option_id)
        console.log(`Found option for response ${index}:`, option)

        if (option && !option.excludes_from_calculation) {
          totalScore += option.points
          questionsIncluded += 1
          console.log(`Added ${option.points} points. Total now: ${totalScore}`)
        } else if (option?.excludes_from_calculation) {
          console.log(`Option excluded from calculation:`, option)
        }
      }
    })

    const maxPossibleScore = questionsIncluded * 3
    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0

    let classification = "Básico"
    if (percentage >= 85) {
      classification = "Avanzado"
    } else if (percentage >= 60) {
      classification = "Intermedio"
    }

    console.log("Final calculation:", {
      totalScore,
      maxPossibleScore,
      questionsIncluded,
      percentage,
      classification,
    })

    setAssessment({
      total_score: totalScore,
      max_possible_score: maxPossibleScore,
      percentage: Math.round(percentage * 100) / 100,
      classification,
    })
  }

  const handleDownloadPDF = async () => {
    try {
      // Create PDF content
      const pdfContent = generatePDFContent()

      // Create blob and download
      const blob = new Blob([pdfContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `diagnostico-ambiental-${user.name.replace(/\s+/g, "-")}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error al generar el PDF. Por favor, intente nuevamente.")
    }
  }

  const generatePDFContent = () => {
    const responseDetails = responses.map((response) => {
      const question = questions.find((q) => q.id === response.questionId)
      const option = response.response_option_id
        ? responseOptions.find((opt) => opt.id === response.response_option_id)
        : null
      const module = question ? modules.find((m) => m.id === question.module_id) : null

      // Get recommendation from question data
      let recommendation = ""
      if (question?.recommendations && option) {
        recommendation = question.recommendations[option.option_text] || ""
      } else if (question?.recommendations && response.open_response) {
        recommendation = question.recommendations.general || ""
      }

      return {
        module_name: module?.name || "",
        question_text: question?.question_text || "",
        option_text: option?.option_text,
        open_response: response.open_response,
        justification: response.justification,
        recommendation: recommendation,
        points: option?.points || 0,
      }
    })

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Diagnóstico Ambiental - ${user.name}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #22c55e; padding-bottom: 20px; }
        .section { margin-bottom: 25px; page-break-inside: avoid; }
        .user-info { background: #f5f5f5; padding: 15px; border-radius: 5px; }
        .results-summary { background: #e8f5e8; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .question-block { border-left: 4px solid #22c55e; padding-left: 15px; margin-bottom: 20px; page-break-inside: avoid; }
        .recommendation { background: #eff6ff; padding: 10px; border-radius: 5px; margin-top: 10px; }
        .module-header { background: #1e40af; color: white; padding: 10px; margin: 20px 0 10px 0; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .points { color: #22c55e; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Diagnóstico de Transparencia, Participación y Evaluación Ambiental</h1>
        <h2>Ministerio de Ambiente y Desarrollo Sostenible</h2>
        <p>Fecha: ${new Date().toLocaleDateString("es-CO")}</p>
      </div>

      <div class="section">
        <h3>Información del Evaluado</h3>
        <div class="user-info">
          <p><strong>Nombre:</strong> ${user.name}</p>
          <p><strong>Teléfono:</strong> ${user.phone}</p>
          <p><strong>Correo:</strong> ${user.email}</p>
          <p><strong>Entidad:</strong> ${user.entity}</p>
          <p><strong>Municipio:</strong> ${user.municipality}</p>
        </div>
      </div>

      <div class="section">
        <h3>Resumen de Resultados</h3>
        <div class="results-summary">
          <p><strong>Puntuación Total:</strong> ${assessment?.total_score} de ${assessment?.max_possible_score}</p>
          <p><strong>Porcentaje:</strong> ${assessment?.percentage}%</p>
          <p><strong>Clasificación:</strong> ${assessment?.classification}</p>
        </div>
      </div>

      <div class="section">
        <h3>Respuestas Detalladas</h3>
        ${Object.entries(
          responseDetails.reduce(
            (groups, response) => {
              const module = response.module_name
              if (!groups[module]) groups[module] = []
              groups[module].push(response)
              return groups
            },
            {} as Record<string, typeof responseDetails>,
          ),
        )
          .map(
            ([moduleName, moduleResponses]) => `
          <div class="module-header">
            <h4>${moduleName}</h4>
          </div>
          ${moduleResponses
            .map(
              (response, index) => `
            <div class="question-block">
              <p><strong>Pregunta ${index + 1}:</strong> ${response.question_text}</p>
              <p><strong>Respuesta:</strong> ${response.option_text || response.open_response} 
                ${response.points !== undefined && response.points > 0 ? `<span class="points">(${response.points} puntos)</span>` : ""}</p>
              ${response.justification ? `<p><strong>Justificación:</strong> ${response.justification}</p>` : ""}
              ${
                response.recommendation
                  ? `
                <div class="recommendation">
                  <strong>Recomendación:</strong> ${response.recommendation}
                </div>
              `
                  : ""
              }
            </div>
          `,
            )
            .join("")}
        `,
          )
          .join("")}
      </div>
    </body>
    </html>
  `
  }

  const handleStartNew = () => {
    window.location.reload()
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Calculando resultados...</p>
        </div>
      </div>
    )
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Avanzado":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  // Group responses by module
  const responseDetails = responses.map((response) => {
    const question = questions.find((q) => q.id === response.questionId)
    const option = response.response_option_id
      ? responseOptions.find((opt) => opt.id === response.response_option_id)
      : null
    const module = question ? modules.find((m) => m.id === question.module_id) : null

    // Get recommendation from question data
    let recommendation = ""
    if (question?.recommendations && option) {
      recommendation = question.recommendations[option.option_text] || ""
    } else if (question?.recommendations && response.open_response) {
      recommendation = question.recommendations.general || ""
    }

    return {
      question_text: question?.question_text || "",
      option_text: option?.option_text,
      open_response: response.open_response,
      justification: response.justification,
      recommendation: recommendation,
      module_name: module?.name || "",
      points: option?.points,
    }
  })

  const moduleGroups = responseDetails.reduce(
    (groups, response) => {
      const module = response.module_name
      if (!groups[module]) {
        groups[module] = []
      }
      groups[module].push(response)
      return groups
    },
    {} as Record<string, typeof responseDetails>,
  )

  console.log("Rendering results with:", { assessment, responseDetails, moduleGroups })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
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
              <h1 className="text-2xl font-bold text-green-800">Resultados del Diagnóstico</h1>
              <p className="text-green-700">Transparencia, Participación y Evaluación Ambiental</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
            <Button onClick={handleStartNew} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Nueva Evaluación
            </Button>
          </div>
        </div>

        {/* Información del Evaluado */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardTitle className="text-xl">Información del Evaluado</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Nombre:</strong> {user.name}
              </div>
              <div>
                <strong>Entidad:</strong> {user.entity}
              </div>
              <div>
                <strong>Teléfono:</strong> {user.phone}
              </div>
              <div>
                <strong>Correo:</strong> {user.email}
              </div>
              <div>
                <strong>Municipio:</strong> {user.municipality}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardTitle className="text-xl">Resumen de Resultados</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{assessment.total_score}</div>
                <div className="text-sm text-gray-600">Puntuación Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{assessment.max_possible_score}</div>
                <div className="text-sm text-gray-600">Puntuación Máxima</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{assessment.percentage}%</div>
                <div className="text-sm text-gray-600">Porcentaje</div>
              </div>
              <div className="text-center">
                <Badge className={`text-lg px-4 py-2 ${getClassificationColor(assessment.classification)}`}>
                  {assessment.classification}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debug Information */}
        <Card className="mb-6 shadow-lg bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg text-yellow-800">Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <p>
                <strong>Total Responses:</strong> {responses.length}
              </p>
              <p>
                <strong>Responses with option_id:</strong> {responses.filter((r) => r.response_option_id).length}
              </p>
              <p>
                <strong>Response Options Available:</strong> {responseOptions.length}
              </p>
              <p>
                <strong>Module Groups:</strong> {Object.keys(moduleGroups).length}
              </p>
              <p>
                <strong>Response Details:</strong> {responseDetails.length}
              </p>
              <p>
                <strong>Sample Response:</strong> {JSON.stringify(responses[0] || "No responses")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results by Module */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Respuestas Detalladas</h2>

          {Object.keys(moduleGroups).length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center text-gray-500">
                <p>No hay respuestas para mostrar. Total de respuestas: {responses.length}</p>
                <p>Verifique que se hayan guardado las respuestas correctamente.</p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(moduleGroups).map(([moduleName, moduleResponses]) => (
              <Card key={moduleName} className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="text-lg">{moduleName}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {moduleResponses.map((response, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="font-medium text-gray-800 mb-2">{response.question_text}</div>
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Respuesta:</strong> {response.option_text || response.open_response}
                          {response.points !== undefined && response.points > 0 && (
                            <span className="ml-2 text-green-600 font-semibold">({response.points} puntos)</span>
                          )}
                        </div>
                        {response.justification && (
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Justificación:</strong> {response.justification}
                          </div>
                        )}
                        {response.recommendation && (
                          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                            <strong>Recomendación:</strong> {response.recommendation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
