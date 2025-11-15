"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface Question {
  id: number;
  module_id: number;
  question_text: string;
  question_type: "statement" | "open";
  order_index: number;
  recommendations: Record<string, string>;
  module_name: string;
}

interface Module {
  id: number;
  name: string;
  description: string;
  order_index: number;
}

export function QuestionsManager() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchQuestions();
    fetchModules();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/admin/questions");
      const data = await response.json();

      if (!response.ok) {
        console.error("Error en /api/admin/questions:", data);
        setQuestions([]);
        return;
      }

      const arrayData = Array.isArray(data) ? data : [];

      // Parsear el campo recommendations si viene como string JSON
      const parsedData = arrayData.map((q: any) => {
        const raw = q.recommendations ?? q.recommendation;

        let parsed: Record<string, string> = {};
        if (typeof raw === "string" && raw.trim() !== "") {
          try {
            parsed = JSON.parse(raw);
          } catch {
            parsed = {};
          }
        } else if (raw && typeof raw === "object") {
          parsed = raw as Record<string, string>;
        }

        return {
          ...q,
          recommendations: parsed,
        };
      });

      setQuestions(parsedData);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await fetch("/api/admin/modules");
      const data = await response.json();

      if (!response.ok) {
        console.error("Error en /api/admin/modules:", data);
        setModules([]);
        return;
      }

      setModules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setModules([]);
    }
  };

  const handleSaveQuestion = async (questionData: Partial<Question>) => {
    try {
      const method = editingQuestion ? "PUT" : "POST";
      const response = await fetch("/api/admin/questions", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        fetchQuestions();
        setIsDialogOpen(false);
        setEditingQuestion(null);
      }
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar esta pregunta?")) {
      try {
        const response = await fetch(`/api/admin/questions?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchQuestions();
        }
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  const openEditDialog = (question: Question) => {
    setEditingQuestion(question);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingQuestion(null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Cargando preguntas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Preguntas</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Pregunta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingQuestion ? "Editar Pregunta" : "Nueva Pregunta"}
              </DialogTitle>
            </DialogHeader>
            <QuestionForm
              question={editingQuestion}
              modules={modules}
              onSave={handleSaveQuestion}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {question.question_text}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{question.module_name}</Badge>
                    <Badge
                      variant={
                        question.question_type === "statement"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {question.question_type === "statement"
                        ? "Declaración"
                        : "Abierta"}
                    </Badge>
                    <Badge variant="outline">
                      Orden: {question.order_index}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(question)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium">Recomendaciones:</h4>
                {question.recommendations && Object.keys(question.recommendations).length > 0 ? (
                  Object.entries(question.recommendations).map(
                    ([key, value]) => (
                      <div key={key} className="text-sm">
                        <strong>{key}:</strong> {value}
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-sm text-gray-500 italic">Sin recomendaciones</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface QuestionFormProps {
  question: Question | null;
  modules: Module[];
  onSave: (data: Partial<Question>) => void;
  onCancel: () => void;
}

function QuestionForm({
  question,
  modules,
  onSave,
  onCancel,
}: QuestionFormProps) {
  const [formData, setFormData] = useState({
    module_id: question?.module_id || "",
    question_text: question?.question_text || "",
    question_type: question?.question_type || "statement",
    order_index: question?.order_index || 1,
    recommendations: question?.recommendations || {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: question?.id,
      module_id: Number(formData.module_id),
      order_index: Number(formData.order_index),
    });
  };

  const updateRecommendation = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      recommendations: {
        ...prev.recommendations,
        [key]: value,
      },
    }));
  };

  const removeRecommendation = (key: string) => {
    const newRecommendations = { ...formData.recommendations };
    delete newRecommendations[key];
    setFormData((prev) => ({
      ...prev,
      recommendations: newRecommendations,
    }));
  };

  const addRecommendation = () => {
    const key = prompt(
      'Ingrese la clave para la recomendación (ej: "Sí - Punto de partida"):',
    );
    if (key) {
      updateRecommendation(key, "");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="module">Módulo</Label>
          <Select
            value={formData.module_id.toString()}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, module_id: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar módulo" />
            </SelectTrigger>
            <SelectContent>
              {modules.map((module) => (
                <SelectItem key={module.id} value={module.id.toString()}>
                  {module.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="question_type">Tipo de Pregunta</Label>
          <Select
            value={formData.question_type}
            onValueChange={(value: "statement" | "open") =>
              setFormData((prev) => ({ ...prev, question_type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="statement">Declaración</SelectItem>
              <SelectItem value="open">Abierta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="question_text">Texto de la Pregunta</Label>
        <Textarea
          id="question_text"
          value={formData.question_text}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, question_text: e.target.value }))
          }
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="order_index">Orden</Label>
        <Input
          id="order_index"
          type="number"
          value={formData.order_index}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              order_index: Number(e.target.value),
            }))
          }
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Recomendaciones</Label>
          <Button type="button" size="sm" onClick={addRecommendation}>
            <Plus className="h-4 w-4 mr-1" />
            Agregar
          </Button>
        </div>
        <div className="space-y-2">
          {Object.entries(formData.recommendations).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <Input
                placeholder="Clave"
                value={key}
                onChange={(e) => {
                  const newKey = e.target.value;
                  const newRecommendations = { ...formData.recommendations };
                  delete newRecommendations[key];
                  newRecommendations[newKey] = value;
                  setFormData((prev) => ({
                    ...prev,
                    recommendations: newRecommendations,
                  }));
                }}
                className="w-1/4"
              />
              <Textarea
                placeholder="Recomendación"
                value={value}
                onChange={(e) => updateRecommendation(key, e.target.value)}
                rows={2}
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => removeRecommendation(key)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Guardar
        </Button>
      </div>
    </form>
  );
}
