"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

interface Assessment {
  id: number;
  user_id: number;
  name: string;
  contact: string;
  entity: string;
  municipality: string;
  total_score: number;
  max_possible_score: number;
  percentage: number;
  classification: string;
  completed_at: string;
  total_responses: number;
}

interface UserResponse {
  id: number;
  question_text: string;
  question_type: string;
  option_text?: string;
  open_response?: string;
  justification?: string;
  points?: number;
  module_name: string;
  recommendations: Record<string, string>;
}

interface UserData {
  id: number;
  name: string;
  contact: string;
  entity: string;
  municipality: string;
}

export function AssessmentsViewer() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<{
    user: UserData;
    responses: UserResponse[];
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const response = await fetch("/api/admin/assessments");
      const data = await response.json();
      setAssessments(data);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewAssessmentDetails = async (userId: number) => {
    setLoadingDetails(true);
    try {
      console.log('Fetching details for user:', userId);
      const response = await fetch(`/api/admin/responses/${userId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      // Parsear el campo recommendation si viene como string JSON, o usar directamente si ya es objeto
      const parsedData = {
        ...data,
        responses: data.responses?.map((r: any) => {
          let recommendations = {};
          
          // Si ya es un objeto (JSONB desde Neon), usarlo directamente
          if (typeof r.recommendation === 'object' && r.recommendation !== null) {
            recommendations = r.recommendation;
          } 
          // Si es string, intentar parsear
          else if (typeof r.recommendation === 'string' && r.recommendation) {
            try {
              recommendations = JSON.parse(r.recommendation);
            } catch (e) {
              console.warn(`No se pudo parsear recommendation para respuesta`, e);
            }
          }
          
          return {
            ...r,
            recommendations,
          };
        }) || [],
      };
      
      setSelectedAssessment(parsedData);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching assessment details:", error);
      alert("Error al cargar los detalles de la evaluación. Por favor intenta de nuevo.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Bien encaminado":
        return "bg-green-100 text-green-800";
      case "En proceso":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando evaluaciones...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Evaluaciones Realizadas</h2>
        <p className="text-gray-600">
          Total: {assessments.length} evaluaciones
        </p>
      </div>

      <div className="grid gap-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{assessment.name}</CardTitle>
                  <p className="text-gray-600">{assessment.entity}</p>
                  <p className="text-sm text-gray-500">
                    {assessment.municipality}
                  </p>
                  <p className="text-xs text-gray-400">
                    Completado:{" "}
                    {new Date(assessment.completed_at).toLocaleDateString(
                      "es-CO",
                    )}
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <Badge
                    className={getClassificationColor(
                      assessment.classification,
                    )}
                  >
                    {assessment.classification}
                  </Badge>
                  <div className="text-sm">
                    <p>
                      <strong>Puntuación:</strong> {assessment.total_score}/
                      {assessment.max_possible_score}
                    </p>
                    <p>
                      <strong>Porcentaje:</strong> {assessment.percentage}%
                    </p>
                    <p>
                      <strong>Respuestas:</strong> {assessment.total_responses}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => viewAssessmentDetails(assessment.user_id)}
                  disabled={loadingDetails}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {loadingDetails ? "Cargando..." : "Ver Detalles"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Detalles de la Evaluación - {selectedAssessment?.user.name}
            </DialogTitle>
          </DialogHeader>
          {selectedAssessment && (
            <div className="space-y-6">
              {/* User Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Información del Evaluado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong>Nombre:</strong> {selectedAssessment.user.name}
                    </div>
                    <div>
                      <strong>Contacto:</strong>{" "}
                      {selectedAssessment.user.contact}
                    </div>
                    <div>
                      <strong>Entidad:</strong> {selectedAssessment.user.entity}
                    </div>
                    <div>
                      <strong>Municipio:</strong>{" "}
                      {selectedAssessment.user.municipality}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Responses by Module */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Respuestas Detalladas</h3>
                {Object.entries(
                  selectedAssessment.responses.reduce(
                    (groups, response) => {
                      const module = response.module_name;
                      if (!groups[module]) groups[module] = [];
                      groups[module].push(response);
                      return groups;
                    },
                    {} as Record<string, UserResponse[]>,
                  ),
                ).map(([moduleName, moduleResponses]) => (
                  <Card key={moduleName}>
                    <CardHeader>
                      <CardTitle className="text-lg">{moduleName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {moduleResponses.map((response, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-blue-500 pl-4 py-2"
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
                            {response.option_text &&
                              response.recommendations &&
                              response.recommendations[
                                response.option_text
                              ] && (
                                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                                  <strong>Recomendación:</strong>{" "}
                                  {
                                    response.recommendations[
                                      response.option_text
                                    ]
                                  }
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
