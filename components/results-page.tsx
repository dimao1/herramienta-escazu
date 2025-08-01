"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw } from "lucide-react";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  contact: string;
  entity: string;
  municipality: string;
  phone: string;
  email: string;
}

interface UserResponse {
  questionId: number;
  response_option_id?: number;
  open_response?: string;
  justification?: string;
}

interface Question {
  id: number;
  module_id: number;
  question_text: string;
  question_type: "statement" | "open";
  order_index: number;
  recommendations: Record<string, string>;
}

interface ResponseOption {
  id: number;
  option_text: string;
  points: number;
  excludes_from_calculation: boolean;
}

interface Module {
  id: number;
  name: string;
  description: string;
  order_index: number;
}

interface ResultsPageProps {
  userId: number;
  user: User;
  responses: UserResponse[];
  questions: Question[];
  responseOptions: ResponseOption[];
  modules: Module[];
}

export function ResultsPage({
  userId,
  user,
  responses,
  questions,
  responseOptions,
  modules,
}: ResultsPageProps) {
  const [assessment, setAssessment] = useState<{
    total_score: number;
    max_possible_score: number;
    percentage: number;
    classification: string;
  } | null>(null);

  useEffect(() => {
    console.log("Calculating assessment with:", { responses, responseOptions });
    calculateAssessment();
  }, [responses, questions, responseOptions]);

  const calculateAssessment = () => {
    let totalScore = 0;
    let questionsIncluded = 0;

    console.log("Starting calculation with responses:", responses);

    responses.forEach((response, index) => {
      console.log(`Processing response ${index}:`, response);

      if (response.response_option_id) {
        const option = responseOptions.find(
          (opt) => opt.id === response.response_option_id,
        );
        console.log(`Found option for response ${index}:`, option);

        if (option && !option.excludes_from_calculation) {
          totalScore += option.points;
          questionsIncluded += 1;
          console.log(
            `Added ${option.points} points. Total now: ${totalScore}`,
          );
        } else if (option?.excludes_from_calculation) {
          console.log(`Option excluded from calculation:`, option);
        }
      }
    });

    const maxPossibleScore = questionsIncluded * 3;
    const percentage =
      maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

    let classification = "Punto de partida";
    if (percentage >= 71) {
      classification = "Bien encaminado";
    } else if (percentage >= 50) {
      classification = "En proceso";
    }

    console.log("Final calculation:", {
      totalScore,
      maxPossibleScore,
      questionsIncluded,
      percentage,
      classification,
    });

    setAssessment({
      total_score: totalScore,
      max_possible_score: maxPossibleScore,
      percentage: Math.round(percentage * 100) / 100,
      classification,
    });
  };

  // Función para limpiar el texto de la pregunta eliminando la numeración inicial
  const cleanQuestionText = (text: string): string => {
    // Busca patrones como "1. ", "12. ", etc. al inicio del texto y los elimina
    return text.replace(/^\d+\.\s+/, "");
  };

  const handleDownloadPDF = async () => {
    try {
      // Crear el contenido del PDF usando jsPDF
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Función para agregar rectángulos con color de fondo
      const addColoredRect = (
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
      ) => {
        doc.setFillColor(color);
        doc.rect(x, y, width, height, "F");
      };

      // Función para obtener color RGB desde hex
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: Number.parseInt(result[1], 16),
              g: Number.parseInt(result[2], 16),
              b: Number.parseInt(result[3], 16),
            }
          : { r: 0, g: 0, b: 0 };
      };

      // Configurar fuente
      doc.setFont("helvetica");

      // Agregar logo del ministerio
      try {
        // Convertir la imagen a base64 para incluirla en el PDF
        const logoImg = new Image();
        logoImg.crossOrigin = "anonymous";
        logoImg.src = "/logo-ambiente.png";

        await new Promise((resolve, reject) => {
          logoImg.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = logoImg.width;
            canvas.height = logoImg.height;
            ctx.drawImage(logoImg, 0, 0);
            const logoDataUrl = canvas.toDataURL("image/png");

            // Agregar logo al PDF (esquina superior derecha)
            doc.addImage(logoDataUrl, "PNG", pageWidth - 50, 10, 40, 25);
            resolve();
          };
          logoImg.onerror = reject;
        });
      } catch (error) {
        console.log("No se pudo cargar el logo:", error);
      }

      // Header con logo y título
      doc.setFontSize(18);
      doc.setTextColor(34, 139, 34); // Verde
      doc.text("Resultados del Diagnóstico", 20, 25);

      doc.setFontSize(12);
      doc.setTextColor(0, 100, 0); // Verde más oscuro
      doc.text("Transparencia, Participación y Evaluación Ambiental", 20, 35);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `Fecha de generación: ${new Date().toLocaleDateString("es-CO")}`,
        20,
        45,
      );

      let yPos = 55;

      // Información del Evaluado con fondo verde
      const greenColor = hexToRgb("#22c55e");
      addColoredRect(
        10,
        yPos - 5,
        pageWidth - 20,
        15,
        `rgb(${greenColor.r}, ${greenColor.g}, ${greenColor.b})`,
      );

      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // Blanco
      doc.text("Información del Evaluado", 15, yPos + 5);

      yPos += 15;

      // Contenido de información del evaluado con fondo gris claro
      addColoredRect(10, yPos - 5, pageWidth - 20, 35, "rgb(248, 250, 252)");

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Nombre: ${user.name}`, 15, yPos + 5);
      doc.text(`Entidad: ${user.entity}`, 110, yPos + 5);
      doc.text(`Teléfono: ${user.phone}`, 15, yPos + 15);
      doc.text(`Correo: ${user.email}`, 110, yPos + 15);
      doc.text(`Municipio: ${user.municipality}`, 15, yPos + 25);

      yPos += 35;

      // ¿Cómo estamos? con fondo azul
      const blueColor = hexToRgb("#3b82f6");
      addColoredRect(
        10,
        yPos - 5,
        pageWidth - 20,
        15,
        `rgb(${blueColor.r}, ${blueColor.g}, ${blueColor.b})`,
      );

      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // Blanco
      doc.text("¿Cómo estamos?", 15, yPos + 5);

      yPos += 20;

      // Métricas en cajas con colores
      const metricBoxWidth = (pageWidth - 40) / 4;
      const metricBoxHeight = 30;

      // Puntuación Total (Verde)
      addColoredRect(
        15,
        yPos,
        metricBoxWidth,
        metricBoxHeight,
        "rgb(34, 197, 94)",
      );
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `${assessment?.total_score}`,
        15 + metricBoxWidth / 2 - 5,
        yPos + 15,
      );
      doc.setFontSize(8);
      doc.text("Puntuación Total", 15 + metricBoxWidth / 2 - 15, yPos + 25);

      // Puntuación Máxima (Azul)
      addColoredRect(
        15 + metricBoxWidth + 5,
        yPos,
        metricBoxWidth,
        metricBoxHeight,
        "rgb(59, 130, 246)",
      );
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `${assessment?.max_possible_score}`,
        15 + metricBoxWidth + 5 + metricBoxWidth / 2 - 5,
        yPos + 15,
      );
      doc.setFontSize(8);
      doc.text(
        "Puntuación Máxima",
        15 + metricBoxWidth + 5 + metricBoxWidth / 2 - 18,
        yPos + 25,
      );

      // Porcentaje (Púrpura)
      addColoredRect(
        15 + (metricBoxWidth + 5) * 2,
        yPos,
        metricBoxWidth,
        metricBoxHeight,
        "rgb(147, 51, 234)",
      );
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `${assessment?.percentage}%`,
        15 + (metricBoxWidth + 5) * 2 + metricBoxWidth / 2 - 10,
        yPos + 15,
      );
      doc.setFontSize(8);
      doc.text(
        "Porcentaje",
        15 + (metricBoxWidth + 5) * 2 + metricBoxWidth / 2 - 10,
        yPos + 25,
      );

      // Clasificación (Color según nivel)
      let classificationColor = "rgb(239, 68, 68)"; // Rojo para Punto de partida
      if (assessment?.classification === "Bien encaminado") {
        classificationColor = "rgb(34, 197, 94)"; // Verde
      } else if (assessment?.classification === "En proceso") {
        classificationColor = "rgb(245, 158, 11)"; // Amarillo
      }

      addColoredRect(
        15 + (metricBoxWidth + 5) * 3,
        yPos,
        metricBoxWidth,
        metricBoxHeight,
        classificationColor,
      );
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `${assessment?.classification}`,
        15 + (metricBoxWidth + 5) * 3 + metricBoxWidth / 2 - 15,
        yPos + 20,
      );

      yPos += 35;

      // Descripción del nivel de clasificación
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const description = getClassificationDescription(
        assessment?.classification || "",
      );
      const wrappedDescription = doc.splitTextToSize(
        description,
        pageWidth - 30,
      );
      doc.text("Descripción breve:", 15, yPos);
      yPos += 8;
      doc.text(wrappedDescription, 15, yPos);
      yPos += wrappedDescription.length * 5 + 10;

      // Respuestas Detalladas
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Respuestas Detalladas", pageWidth / 2 - 30, yPos);
      yPos += 10;

      // Agrupar respuestas por módulo
      const responseDetails = responses.map((response) => {
        const question = questions.find((q) => q.id === response.questionId);
        const option = response.response_option_id
          ? responseOptions.find(
              (opt) => opt.id === response.response_option_id,
            )
          : null;
        const module = question
          ? modules.find((m) => m.id === question.module_id)
          : null;

        let recommendation = "";
        if (question?.recommendations && option) {
          recommendation = question.recommendations[option.option_text] || "";
        } else if (question?.recommendations && response.open_response) {
          recommendation = question.recommendations.general || "";
        }

        return {
          question_text: question?.question_text || "",
          option_text: option?.option_text,
          open_response: response.open_response,
          justification: response.justification,
          recommendation: recommendation,
          module_name: module?.name || "",
          points: option?.points,
        };
      });

      const moduleGroups = responseDetails.reduce(
        (groups, response) => {
          const module = response.module_name;
          if (!groups[module]) {
            groups[module] = [];
          }
          groups[module].push(response);
          return groups;
        },
        {} as Record<string, typeof responseDetails>,
      );

      let questionNumber = 1;
      let isFirstModule = true;

      Object.entries(moduleGroups).forEach(([moduleName, moduleResponses]) => {
        // Salto de página para cada módulo (excepto el primero)
        if (!isFirstModule) {
          doc.addPage();
          yPos = 20;
        }
        isFirstModule = false;

        // Verificar si necesitamos una nueva página
        if (yPos > pageHeight - 60) {
          doc.addPage();
          yPos = 20;
        }

        // Título del módulo con fondo azul
        addColoredRect(
          10,
          yPos - 5,
          pageWidth - 20,
          15,
          `rgb(${blueColor.r}, ${blueColor.g}, ${blueColor.b})`,
        );
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.text(moduleName, 15, yPos + 5);
        yPos += 20;

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);

        moduleResponses.forEach((response) => {
          // Verificar si necesitamos una nueva página
          if (yPos > pageHeight - 80) {
            doc.addPage();
            yPos = 20;
          }

          // Fondo para cada pregunta
          const questionHeight =
            40 +
            (response.justification ? 15 : 0) +
            (response.recommendation ? 20 : 0);
          addColoredRect(
            10,
            yPos - 5,
            pageWidth - 20,
            questionHeight,
            "rgb(249, 250, 251)",
          );

          // Borde izquierdo verde
          addColoredRect(10, yPos - 5, 3, questionHeight, "rgb(34, 197, 94)");

          // Limpiar el texto de la pregunta para eliminar la numeración inicial
          const cleanedQuestionText = cleanQuestionText(response.question_text);

          // Pregunta con numeración secuencial
          const questionLines = doc.splitTextToSize(
            `${questionNumber}. ${cleanedQuestionText}`,
            160,
          );
          doc.setTextColor(0, 0, 0);
          doc.setFont("helvetica", "bold");
          doc.text(questionLines, 20, yPos + 5);
          yPos += questionLines.length * 4 + 5;

          // Respuesta
          const answerText =
            response.option_text || response.open_response || "";
          const pointsText =
            response.points !== undefined && response.points > 0
              ? ` (${response.points} puntos)`
              : "";
          doc.setFont("helvetica", "normal");
          doc.setTextColor(75, 85, 99);
          const responseLines = doc.splitTextToSize(
            `Respuesta: ${answerText}${pointsText}`,
            160,
          );
          doc.text(responseLines, 20, yPos);
          yPos += responseLines.length * 4 + 3;

          // Justificación si existe
          if (response.justification) {
            doc.setTextColor(75, 85, 99);
            const justificationLines = doc.splitTextToSize(
              `Justificación: ${response.justification}`,
              160,
            );
            doc.text(justificationLines, 20, yPos);
            yPos += justificationLines.length * 4 + 3;
          }

          // Recomendación si existe
          if (response.recommendation) {
            // Fondo azul claro para recomendación
            const recHeight =
              Math.ceil(response.recommendation.length / 80) * 4 + 8;
            addColoredRect(
              20,
              yPos - 2,
              pageWidth - 40,
              recHeight,
              "rgb(239, 246, 255)",
            );

            doc.setTextColor(30, 64, 175);
            doc.setFont("helvetica", "bold");
            doc.text("Recomendación:", 25, yPos + 3);
            doc.setFont("helvetica", "normal");
            const recommendationLines = doc.splitTextToSize(
              response.recommendation,
              150,
            );
            doc.text(recommendationLines, 25, yPos + 8);
            yPos += recommendationLines.length * 4 + 8;
          }

          yPos += 10; // Espacio entre preguntas
          questionNumber++; // Incrementar numeración secuencial
        });

        yPos += 10; // Espacio entre módulos
      });

      // Guardar el PDF
      const fileName = `Diagnostico_${user.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al generar el PDF. Por favor, intente nuevamente.");
    }
  };

  const handleStartNew = () => {
    window.location.reload();
  };

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Calculando resultados...</p>
        </div>
      </div>
    );
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Bien encaminado":
        return "bg-green-100 text-green-800 border-green-200";
      case "En proceso":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getClassificationDescription = (classification: string) => {
    switch (classification) {
      case "Bien encaminado":
        return "La mayoría de prácticas clave están implementadas o en ejecución. Se recomienda darles continuidad, optimizarlas y mantener su efectividad en el tiempo.";
      case "En proceso":
        return "Hay prácticas sólidamente implementadas. El avance es visible, pero aún hay áreas por fortalecer.";
      default:
        return "Se identifican múltiples acciones que aún no están en marcha. Es el punto de inicio para estructurar prioridades.";
    }
  };

  // Group responses by module
  const responseDetails = responses.map((response) => {
    const question = questions.find((q) => q.id === response.questionId);
    const option = response.response_option_id
      ? responseOptions.find((opt) => opt.id === response.response_option_id)
      : null;
    const module = question
      ? modules.find((m) => m.id === question.module_id)
      : null;

    // Get recommendation from question data
    let recommendation = "";
    if (question?.recommendations && option) {
      recommendation = question.recommendations[option.option_text] || "";
    } else if (question?.recommendations && response.open_response) {
      recommendation = question.recommendations.general || "";
    }

    return {
      question_text: question?.question_text || "",
      option_text: option?.option_text,
      open_response: response.open_response,
      justification: response.justification,
      recommendation: recommendation,
      module_name: module?.name || "",
      points: option?.points,
    };
  });

  const moduleGroups = responseDetails.reduce(
    (groups, response) => {
      const module = response.module_name;
      if (!groups[module]) {
        groups[module] = [];
      }
      groups[module].push(response);
      return groups;
    },
    {} as Record<string, typeof responseDetails>,
  );

  console.log("Rendering results with:", {
    assessment,
    responseDetails,
    moduleGroups,
  });

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
              <h1 className="text-2xl font-bold text-green-800">
                Resultados del Diagnóstico
              </h1>
              <p className="text-green-700">
                Transparencia, Participación y Evaluación Ambiental
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleDownloadPDF}
              className="bg-blue-600 hover:bg-blue-700"
            >
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
            <CardTitle className="text-xl">¿Cómo estamos?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {assessment.total_score}
                </div>
                <div className="text-sm text-gray-600">Puntuación Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {assessment.max_possible_score}
                </div>
                <div className="text-sm text-gray-600">Puntuación Máxima</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {assessment.percentage}%
                </div>
                <div className="text-sm text-gray-600">Porcentaje</div>
              </div>
              <div className="text-center">
                <Badge
                  className={`text-lg px-4 py-2 ${getClassificationColor(assessment.classification)}`}
                >
                  {assessment.classification}
                </Badge>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 text-center">
                <strong>Descripción breve:</strong>{" "}
                {getClassificationDescription(assessment.classification)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results by Module */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Respuestas Detalladas
          </h2>

          {Object.keys(moduleGroups).length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center text-gray-500">
                <p>
                  No hay respuestas para mostrar. Total de respuestas:{" "}
                  {responses.length}
                </p>
                <p>
                  Verifique que se hayan guardado las respuestas correctamente.
                </p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(moduleGroups).map(
              ([moduleName, moduleResponses]) => (
                <Card key={moduleName} className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="text-lg">{moduleName}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {moduleResponses.map((response, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-green-500 pl-4 py-2"
                        >
                          <div className="font-medium text-gray-800 mb-2">
                            {response.question_text}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Respuesta:</strong>{" "}
                            {response.option_text || response.open_response}
                            {response.points !== undefined &&
                              response.points > 0 && (
                                <span className="ml-2 text-green-600 font-semibold">
                                  ({response.points} puntos)
                                </span>
                              )}
                          </div>
                          {response.justification && (
                            <div className="text-sm text-gray-600 mb-2">
                              <strong>Justificación:</strong>{" "}
                              {response.justification}
                            </div>
                          )}
                          {response.recommendation && (
                            <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                              <strong>Recomendación:</strong>{" "}
                              {response.recommendation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
}
