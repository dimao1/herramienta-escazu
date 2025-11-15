"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, BarChart3, Settings, LogOut } from "lucide-react";
import { QuestionsManager } from "./questions-manager";
import { ModulesManager } from "./modules-manager";
import { AssessmentsViewer } from "./assessments-viewer";
import { ResponseOptionsManager } from "./response-options-manager";
import { DataExport } from "./data-export";

interface AdminUser {
  id: number;
  username: string;
  role: string;
}

interface AdminDashboardProps {
  admin: AdminUser;
  onLogout: () => void;
}

interface DashboardStats {
  totalUsers: number;
  totalAssessments: number;
  totalQuestions: number;
  totalModules: number;
}

interface RecentAssessment {
  id: number;
  user_id: number;
  total_score: number;
  max_possible_score: number;
  percentage: number;
  classification: string;
  completed_at: string;
  user: {
    name: string;
    entity: string;
    municipality: string;
  };
}

interface ClassificationStat {
  classification: string;
  count: number;
}

export function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAssessments, setRecentAssessments] = useState<
    RecentAssessment[]
  >([]);
  const [classificationStats, setClassificationStats] = useState<
    ClassificationStat[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      const data = await response.json();

      if (!response.ok) {
        console.error("Error en /api/admin/dashboard:", data);
        setStats(null);
        setRecentAssessments([]);
        setClassificationStats([]);
        return;
      }

      setStats(data.stats ?? null);
      setRecentAssessments(data.recentAssessments ?? []);
      setClassificationStats(data.classificationStats ?? []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setStats(null);
      setRecentAssessments([]);
      setClassificationStats([]);
    } finally {
      setLoading(false);
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

  const formatDateTime = (dateString: string) => {
    try {
      const originalDate = new Date(dateString);

      // La base de datos está guardando la hora ~5 horas por delante
      // Ajustamos restando 5 horas para mostrar la hora real de Bogotá
      const adjustedDate = new Date(
        originalDate.getTime() - 5 * 60 * 60 * 1000,
      );

      return new Intl.DateTimeFormat("es-CO", {
        timeZone: "America/Bogota",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(adjustedDate);
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-gray-600">Bienvenido, {admin.username}</p>
            </div>
            <Button onClick={onLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="questions">Preguntas</TabsTrigger>
            <TabsTrigger value="modules">Módulos</TabsTrigger>
            <TabsTrigger value="options">Opciones</TabsTrigger>
            <TabsTrigger value="assessments">Evaluaciones</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Usuarios
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats?.totalUsers}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Evaluaciones
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats?.totalAssessments}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Preguntas
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats?.totalQuestions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Settings className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Módulos
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats?.totalModules}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Assessments */}
              <Card>
                <CardHeader>
                  <CardTitle>Evaluaciones Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAssessments.map((assessment) => (
                      <div
                        key={assessment.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{assessment.user.name}</p>
                          <p className="text-sm text-gray-600">
                            {assessment.user.entity}
                          </p>
                          <p className="text-xs text-gray-500">
                            {assessment.user.municipality}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDateTime(assessment.completed_at)}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={getClassificationColor(
                              assessment.classification,
                            )}
                          >
                            {assessment.classification}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            {assessment.percentage}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Classification Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Clasificación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classificationStats.map((stat) => (
                      <div
                        key={stat.classification}
                        className="flex items-center justify-between"
                      >
                        <Badge
                          className={getClassificationColor(
                            stat.classification,
                          )}
                        >
                          {stat.classification}
                        </Badge>
                        <span className="text-2xl font-bold">{stat.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions">
            <QuestionsManager />
          </TabsContent>

          <TabsContent value="modules">
            <ModulesManager />
          </TabsContent>

          <TabsContent value="options">
            <ResponseOptionsManager />
          </TabsContent>

          <TabsContent value="assessments">
            <AssessmentsViewer />
          </TabsContent>

          <TabsContent value="export">
            <DataExport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
