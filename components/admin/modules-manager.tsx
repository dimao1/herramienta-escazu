"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface Module {
  id: number;
  name: string;
  description: string;
  order_index: number;
}

export function ModulesManager() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch("/api/admin/modules");
      const data = await response.json();
      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveModule = async (moduleData: Partial<Module>) => {
    try {
      const method = editingModule ? "PUT" : "POST";
      const response = await fetch("/api/admin/modules", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      });

      if (response.ok) {
        fetchModules();
        setIsDialogOpen(false);
        setEditingModule(null);
      }
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };

  const handleDeleteModule = async (id: number) => {
    if (
      confirm(
        "¿Está seguro de que desea eliminar este módulo? Esto también eliminará todas las preguntas asociadas.",
      )
    ) {
      try {
        const response = await fetch(`/api/admin/modules?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchModules();
        }
      } catch (error) {
        console.error("Error deleting module:", error);
      }
    }
  };

  const openEditDialog = (module: Module) => {
    setEditingModule(module);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingModule(null);
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Cargando módulos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Módulos</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Módulo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingModule ? "Editar Módulo" : "Nuevo Módulo"}
              </DialogTitle>
            </DialogHeader>
            <ModuleForm
              module={editingModule}
              onSave={handleSaveModule}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{module.name}</CardTitle>
                  <p className="text-gray-600 mt-2">{module.description}</p>
                  <Badge variant="outline" className="mt-2">
                    Orden: {module.order_index}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(module)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteModule(module.id)}
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

interface ModuleFormProps {
  module: Module | null;
  onSave: (data: Partial<Module>) => void;
  onCancel: () => void;
}

function ModuleForm({ module, onSave, onCancel }: ModuleFormProps) {
  const [formData, setFormData] = useState({
    name: module?.name || "",
    description: module?.description || "",
    order_index: module?.order_index || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: module?.id,
      order_index: Number(formData.order_index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre del Módulo</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={3}
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
