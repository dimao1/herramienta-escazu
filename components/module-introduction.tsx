"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ModuleIntroductionProps {
  moduleId: number;
  moduleName: string;
  questionCount: number;
  onContinue: () => void;
}

const moduleContent = {
  1: {
    description:
      "Bienvenida/o al Módulo 1 del instrumento de autodiagnóstico, enfocado en evaluar el nivel de cumplimiento y buenas prácticas relacionadas con la transparencia y el acceso a la información ambiental en tu entidad.",
    aspects: [
      "La actualización periódica de contenidos en tu sitio web institucional",
      "La accesibilidad de la información para poblaciones diferenciales",
      "La claridad en los canales de contacto y tiempos de respuesta",
      "La existencia de criterios para la entrega o denegación de información ambiental",
      "El uso de formatos comprensibles y lenguaje claro",
    ],
    closing:
      "Este módulo busca identificar fortalezas, oportunidades de mejora y generar recomendaciones personalizadas para avanzar hacia una gestión ambiental más abierta, inclusiva y efectiva. Tómate el tiempo necesario para responder con honestidad y precisión. Tu participación es clave para fortalecer la cultura de transparencia ambiental en el territorio.",
  },
  2: {
    description:
      "Bienvenida/o al Módulo 2 del instrumento de autodiagnóstico, enfocado en evaluar las acciones de tu entidad relacionadas con la divulgación, publicación y accesibilidad de la información ambiental. A través de este módulo se valoran aspectos como:",
    aspects: [
      "La periodicidad y cobertura de la divulgación del derecho al acceso a la información ambiental",
      "La existencia de registros de emisiones y transferencias de contaminantes",
      "La capacidad de respuesta ante amenazas ambientales o riesgos a la salud pública",
      "El uso de plataformas como VITAL, SIAC y RUA",
      "La disponibilidad de datos en formatos abiertos y editables",
      "La medición del desempeño ambiental y la publicación de resultados",
      "La transparencia en procesos de toma de decisiones ambientales",
      "La articulación con actores privados para fomentar la publicación de información ambiental",
    ],
    closing:
      "Este módulo busca identificar el grado de apertura institucional frente a la gestión ambiental, así como promover buenas prácticas de comunicación pública, acceso a datos y rendición de cuentas. Responde con sinceridad y precisión. Tu aporte es fundamental para fortalecer la gobernanza ambiental en el territorio.",
  },
  3: {
    description:
      "Bienvenida/o al Módulo 3 del instrumento de autodiagnóstico, enfocado en evaluar el compromiso de tu entidad con la participación ciudadana en los procesos de toma de decisiones ambientales. A través de este módulo se valoran prácticas como:",
    aspects: [
      "La existencia de planes alineados con marcos normativos nacionales e internacionales",
      "La promoción de espacios participativos abiertos, inclusivos y permanentes",
      "La información oportuna sobre procesos, decisiones y derechos de participación",
      "La atención a comunidades directamente afectadas, incluyendo pueblos indígenas y grupos en situación de vulnerabilidad",
      "La consideración efectiva de las observaciones ciudadanas en decisiones ambientales",
      "La facilitación de mecanismos de impugnación, control social y rendición de cuentas",
      "La implementación de canales formales para solicitudes de información pública ambiental",
      "El uso de lenguas y dialectos oficiales distintos al castellano para garantizar inclusión",
    ],
    closing:
      "Este módulo busca identificar el nivel de madurez institucional en la garantía del derecho a participar, incidir y evaluar la gestión ambiental pública. Responder con honestidad y precisión permitirá generar recomendaciones útiles para fortalecer la gobernanza ambiental participativa. Gracias por contribuir a una gestión ambiental más democrática y efectiva.",
  },
};

const scaleOptions = [
  {
    label: "Sí – Básico",
    description:
      "A veces se hace, a veces no se hace. Todo es muy esporádico, aislado o informal y no existen procesos o rutinas para su ejecución regular. Se ha conversado sobre cómo hacerlo mejor, pero no se ha concretado nada",
    points: "1 punto",
  },
  {
    label: "Sí – Intermedio",
    description:
      "Existen procesos o rutinas para su ejecución, pero no se cumplen como se debe. Se han logrado resultados, pero son limitados e irregulares",
    points: "2 puntos",
  },
  {
    label: "Sí – Avanzado",
    description:
      "La acción es regular, se documenta y se evalúa de manera continua. Hay evidencia clara de apropiación institucional y comunitaria (existen procesos, procedimientos y guías), se tiene articulación entre los actores responsables de su cumplimiento y buen nivel de confianza y colaboración en su ejecución",
    points: "3 puntos",
  },
  {
    label: "No",
    description:
      "Aunque se reconoce su necesidad, existen barreras que impiden su ejecución (como, limitaciones de equipo humano, recursos físicos o presupuesto). Algunas de estas acciones son de obligatorio cumplimiento para la entidad, así que es fundamental identificar las causas que impiden su desarrollo y tomar medidas para superarlas",
    points: "0 puntos",
  },
  {
    label: "No aplica",
    description:
      "Esta opción solo se utiliza cuando la acción no corresponde a las funciones o competencias de la entidad, o cuando la acción evaluada no se relaciona con los procesos que adelanta en materia de gestión ambiental. Es importante que antes de responder de esta forma pidan un concepto al área jurídica para asegurar que en realidad la acción no aplica a su entidad",
    points: "ítem excluido del cálculo",
  },
];

export function ModuleIntroduction({
  moduleId,
  moduleName,
  questionCount,
  onContinue,
}: ModuleIntroductionProps) {
  const content = moduleContent[moduleId as keyof typeof moduleContent];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0 z-10">
          <CardTitle className="text-2xl text-center font-bold">
            Introducción al {moduleName}
          </CardTitle>
          <p className="text-center text-green-100 text-sm mt-2">
            Este módulo contiene {questionCount} preguntas
          </p>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {/* Descripción */}
          <div>
            <p className="text-gray-700 leading-relaxed">{content.description}</p>
          </div>

          {/* Aspectos clave */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Aspectos clave que se evalúan:
            </h3>
            <ul className="space-y-2">
              {content.aspects.map((aspect, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 font-bold mt-1">●</span>
                  <span>{aspect}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Escala de respuestas */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Escala de respuestas:
            </h3>
            <div className="space-y-4">
              {scaleOptions.map((option, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <strong className="text-gray-800">{option.label}</strong>
                    <span className="text-sm text-green-600 font-semibold whitespace-nowrap">
                      {option.points}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cierre */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-300">
            <p className="text-gray-700 leading-relaxed font-medium">
              {content.closing}
            </p>
          </div>

          {/* Botón de continuar */}
          <div className="pt-4">
            <Button
              onClick={onContinue}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
            >
              Iniciar {moduleName}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
