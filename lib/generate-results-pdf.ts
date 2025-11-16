import { jsPDF } from "jspdf";

export interface PdfUser {
  name: string;
  entity: string;
  municipality: string;
  phone?: string;
  email?: string;
  contact?: string;
}

export interface PdfAssessmentSummary {
  total_score: number;
  max_possible_score: number;
  percentage: number;
  classification: string;
}

export interface PdfResponseDetail {
  question_text: string;
  option_text?: string;
  open_response?: string;
  justification?: string;
  recommendation?: string;
  module_name: string;
  points?: number;
}

function getClassificationDescription(classification: string) {
  switch (classification) {
    case "Bien encaminado":
      return "La mayoría de prácticas clave están implementadas o en ejecución. Se recomienda darles continuidad, optimizarlas y mantener su efectividad en el tiempo.";
    case "En proceso":
      return "Hay prácticas sólidamente implementadas. El avance es visible, pero aún hay áreas por fortalecer.";
    default:
      return "Se identifican múltiples acciones que aún no están en marcha. Es el punto de inicio para estructurar prioridades.";
  }
}

// Función para limpiar el texto de la pregunta eliminando la numeración inicial
function cleanQuestionText(text: string): string {
  return text.replace(/^\d+\.\s+/, "");
}

export async function generateResultsPdf(params: {
  user: PdfUser;
  assessment: PdfAssessmentSummary;
  responses: PdfResponseDetail[];
}) {
  const { user, assessment, responses } = params;

  // Crear el contenido del PDF usando jsPDF
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

  // Función helper para convertir imagen a base64
  const getImageBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Agregar logo del Ministerio de Ambiente a la izquierda
  try {
    const logoMinisterioBase64 = await getImageBase64("/logo-ambiente.png");
    doc.addImage(logoMinisterioBase64, "PNG", 15, 10, 40, 25);
  } catch (error) {
    console.log("No se pudo cargar el logo del ministerio:", error);
  }

  // Agregar logo Alerta por mi Ambiente al centro-derecha
  try {
    const logoAlertaBase64 = await getImageBase64(
      "/logo-alerta-por-mi-ambiente.png",
    );
    const logoWidth = 30;
    const logoHeight = 30;
    doc.addImage(
      logoAlertaBase64,
      "PNG",
      pageWidth - 85,
      12,
      logoWidth,
      logoHeight,
    );
  } catch (error) {
    console.log("No se pudo cargar el logo de Alerta por mi Ambiente:", error);
  }

  // Agregar logo de Ruta 567 a la derecha
  try {
    const logoRutaBase64 = await getImageBase64("/logo-ruta-567-escazu.png");
    const logoWidth = 30;
    const logoHeight = 30;
    doc.addImage(
      logoRutaBase64,
      "PNG",
      pageWidth - 50,
      12,
      logoWidth,
      logoHeight,
    );
  } catch (error) {
    console.log("No se pudo cargar el logo de Ruta 567:", error);
  }

  // Header con título compacto
  doc.setFontSize(16);
  doc.setTextColor(34, 139, 34); // Verde
  doc.text("Resultados del Diagnóstico", pageWidth / 2, 50, {
    align: "center",
  });

  doc.setFontSize(11);
  doc.setTextColor(0, 100, 0); // Verde más oscuro
  doc.text(
    "Transparencia, Participación y Evaluación Ambiental",
    pageWidth / 2,
    58,
    { align: "center" },
  );

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Fecha de generación: ${new Date().toLocaleDateString("es-CO")}`,
    pageWidth / 2,
    65,
    { align: "center" },
  );

  let yPos = 75;

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

  const phone =
    user.phone ?? (user.contact ? user.contact.split("/")[0]?.trim() : "");
  const email =
    user.email ?? (user.contact ? user.contact.split("/")[1]?.trim() : "");

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Nombre: ${user.name}`, 15, yPos + 5);
  doc.text(`Entidad: ${user.entity}`, 110, yPos + 5);
  if (phone) {
    doc.text(`Teléfono: ${phone}`, 15, yPos + 15);
  }
  if (email) {
    doc.text(`Correo: ${email}`, 110, yPos + 15);
  }
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
  addColoredRect(15, yPos, metricBoxWidth, metricBoxHeight, "rgb(34, 197, 94)");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(`${assessment.total_score}`, 15 + metricBoxWidth / 2 - 5, yPos + 15);
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
    `${assessment.max_possible_score}`,
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
    `${assessment.percentage}%`,
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
  let classificationColor = "rgb(239, 68, 68)"; // Rojo
  if (assessment.classification === "Bien encaminado") {
    classificationColor = "rgb(34, 197, 94)"; // Verde
  } else if (assessment.classification === "En proceso") {
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
    `${assessment.classification}`,
    15 + (metricBoxWidth + 5) * 3 + metricBoxWidth / 2 - 15,
    yPos + 20,
  );

  yPos += 35;

  // Descripción del nivel de clasificación
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const description = getClassificationDescription(assessment.classification);
  const wrappedDescription = doc.splitTextToSize(description, pageWidth - 30);
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
  const moduleGroups = responses.reduce(
    (groups, response) => {
      const moduleName = response.module_name;
      if (!groups[moduleName]) {
        groups[moduleName] = [];
      }
      groups[moduleName].push(response);
      return groups;
    },
    {} as Record<string, PdfResponseDetail[]>,
  );

  let questionNumber = 1;

  Object.entries(moduleGroups).forEach(([moduleName, moduleResponses]) => {
    // Salto de página entre módulos si es necesario
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    // Título del módulo
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(moduleName, 15, yPos);
    yPos += 8;

    doc.setFontSize(9);

    moduleResponses.forEach((response) => {
      if (yPos > pageHeight - 80) {
        doc.addPage();
        yPos = 20;
      }

      const cleanedQuestionText = cleanQuestionText(response.question_text);
      const questionLines = doc.splitTextToSize(
        `${questionNumber}. ${cleanedQuestionText}`,
        pageWidth - 30,
      );
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(questionLines, 15, yPos);
      yPos += questionLines.length * 4 + 5;

      const baseAnswer =
        response.option_text && response.open_response
          ? `${response.option_text} — ${response.open_response}`
          : response.option_text || response.open_response || "";
      const pointsText =
        response.points !== undefined && response.points > 0
          ? ` (${response.points} puntos)`
          : "";
      const answerText = baseAnswer + pointsText;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 85, 99);
      if (answerText) {
        const responseLines = doc.splitTextToSize(
          `Respuesta: ${answerText}`,
          pageWidth - 30,
        );
        doc.text(responseLines, 15, yPos);
        yPos += responseLines.length * 4 + 3;
      }

      if (response.justification) {
        const justificationLines = doc.splitTextToSize(
          `Justificación: ${response.justification}`,
          pageWidth - 30,
        );
        doc.text(justificationLines, 15, yPos);
        yPos += justificationLines.length * 4 + 3;
      }

      if (response.recommendation) {
        const recHeight =
          Math.ceil(response.recommendation.length / 80) * 4 + 8;
        addColoredRect(
          15,
          yPos - 2,
          pageWidth - 30,
          recHeight,
          "rgb(239, 246, 255)",
        );

        doc.setTextColor(30, 64, 175);
        doc.setFont("helvetica", "bold");
        doc.text("Recomendación:", 17, yPos + 3);
        doc.setFont("helvetica", "normal");
        const recommendationLines = doc.splitTextToSize(
          response.recommendation,
          pageWidth - 40,
        );
        doc.text(recommendationLines, 17, yPos + 8);
        yPos += recommendationLines.length * 4 + 8;
      }

      yPos += 10;
      questionNumber += 1;
    });

    yPos += 10;
  });

  const safeName = user.name.replace(/\s+/g, "_") || "evaluacion";
  const fileName = `Evaluacion_${safeName}.pdf`;
  doc.save(fileName);
}
