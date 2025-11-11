"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterizationData {
  name: string;
  phone: string;
  email: string;
  entity: string;
  municipality: string;
}

interface CharacterizationFormProps {
  onSubmit: (data: CharacterizationData) => void;
}

export function CharacterizationForm({ onSubmit }: CharacterizationFormProps) {
  const [formData, setFormData] = useState<CharacterizationData>({
    name: "",
    phone: "",
    email: "",
    entity: "",
    municipality: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(formData);
    }
  };

  const isValid =
    formData.name &&
    formData.phone &&
    formData.email &&
    formData.entity &&
    formData.municipality;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 sm:py-5">
          <CardTitle className="text-xl sm:text-2xl text-center">
            Datos de contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Nombre de quien diligencia *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 sm:mt-2 text-sm sm:text-base"
                placeholder="Ingrese su nombre completo"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="phone"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Celular *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1 sm:mt-2 text-sm sm:text-base"
                placeholder="Ej: 300-123-4567"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Correo Electrónico *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 sm:mt-2 text-sm sm:text-base"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="entity"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Entidad *
              </Label>
              <Input
                id="entity"
                type="text"
                value={formData.entity}
                onChange={(e) =>
                  setFormData({ ...formData, entity: e.target.value })
                }
                className="mt-1 sm:mt-2 text-sm sm:text-base"
                placeholder="Nombre de la entidad o institución"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="municipality"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Municipio *
              </Label>
              <Input
                id="municipality"
                type="text"
                value={formData.municipality}
                onChange={(e) =>
                  setFormData({ ...formData, municipality: e.target.value })
                }
                className="mt-1 sm:mt-2 text-sm sm:text-base"
                placeholder="Municipio donde se realiza la evaluación"
                required
              />
            </div>

            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>Instrucciones:</strong> Con base en la guía de
                diligenciamiento, marque con una X en la casilla apropiada. En
                caso de marcar la casilla "Sí", deberá autoevaluar su estado
                según los niveles: Básico, Intermedio o Avanzado.
              </p>
            </div>

            <Button
              type="submit"
              disabled={!isValid}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-3.5 text-base sm:text-lg"
            >
              Comenzar Evaluación
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
