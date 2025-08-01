"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save } from "lucide-react";

interface ResponseOption {
  id: number;
  option_text: string;
  points: number;
  excludes_from_calculation: boolean;
}

export function ResponseOptionsManager() {
  const [options, setOptions] = useState<ResponseOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOption, setEditingOption] = useState<ResponseOption | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch("/api/admin/response-options");
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOption = async (optionData: Partial<ResponseOption>) => {
    try {
      const method = editingOption ? "PUT" : "POST";
      const response = await fetch("/api/admin/response-options", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(optionData),
      });

      if (response.ok) {
        fetchOptions();
        setIsDialogOpen(false);
        setEditingOption(null);
      }
    } catch (error) {
      console.error("Error saving option:", error);
    }
  };

  const handleDeleteOption = async (id: number) => {
    if (
      confirm("¿Está seguro de que desea eliminar esta opción de respuesta?")
    ) {
      try {
        const response = await fetch(`/api/admin/response-options?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchOptions();
        }
      } catch (error) {
        console.error("Error deleting option:", error);
      }
    }
  };

  const openEditDialog = (option: ResponseOption) => {
    setEditingOption(option);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingOption(null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-8">Cargando opciones de respuesta...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Opciones de Respuesta</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Opción
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingOption ? "Editar Opción" : "Nueva Opción"}
              </DialogTitle>
            </DialogHeader>
            <OptionForm
              option={editingOption}
              onSave={handleSaveOption}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {options.map((option) => (
          <Card key={option.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {option.option_text}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">Puntos: {option.points}</Badge>
                    <Badge
                      variant={
                        option.excludes_from_calculation
                          ? "destructive"
                          : "default"
                      }
                    >
                      {option.excludes_from_calculation
                        ? "Excluida del cálculo"
                        : "Incluida en cálculo"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(option)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteOption(option.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface OptionFormProps {
  option: ResponseOption | null;
  onSave: (data: Partial<ResponseOption>) => void;
  onCancel: () => void;
}

function OptionForm({ option, onSave, onCancel }: OptionFormProps) {
  const [formData, setFormData] = useState({
    option_text: option?.option_text || "",
    points: option?.points || 0,
    excludes_from_calculation: option?.excludes_from_calculation || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: option?.id,
      points: Number(formData.points),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="option_text">Texto de la Opción</Label>
        <Input
          id="option_text"
          value={formData.option_text}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, option_text: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="points">Puntos</Label>
        <Input
          id="points"
          type="number"
          value={formData.points}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, points: Number(e.target.value) }))
          }
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="excludes_from_calculation"
          checked={formData.excludes_from_calculation}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              excludes_from_calculation: checked,
            }))
          }
        />
        <Label htmlFor="excludes_from_calculation">
          Excluir del cálculo de puntuación
        </Label>
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
