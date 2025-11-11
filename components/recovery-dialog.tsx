"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, RotateCcw, Play } from "lucide-react";

interface RecoveryDialogProps {
  show: boolean;
  userName: string;
  lastSaved: string;
  currentQuestion: number;
  totalQuestions: number;
  onRecover: () => void;
  onStartFresh: () => void;
}

export function RecoveryDialog({
  show,
  userName,
  lastSaved,
  currentQuestion,
  totalQuestions,
  onRecover,
  onStartFresh,
}: RecoveryDialogProps) {
  if (!show) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
    } else {
      return `hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
    }
  };

  const progress = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              // Evitar cerrar al hacer click en el backdrop
              e.stopPropagation();
            }}
          >
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="w-full max-w-lg shadow-2xl border-2 border-green-200">
                <CardHeader className="bg-white border-b-2 border-gray-200">
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                    <Clock className="h-6 w-6 text-green-600" />
                    Progreso Guardado Encontrado
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Información del progreso */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-medium">
                        Usuario:
                      </span>
                      <span className="text-sm font-bold text-blue-700">
                        {userName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-medium">
                        Última actualización:
                      </span>
                      <span className="text-sm font-bold text-purple-700">
                        {formatDate(lastSaved)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-medium">
                        Progreso:
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-green-700">
                          {currentQuestion} de {totalQuestions} preguntas
                        </span>
                        <div className="text-xs text-green-600 mt-1">
                          ({progress}% completado)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar visual */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    />
                  </div>

                  {/* Mensaje informativo */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      <strong>💡 Consejo:</strong> Si continúas donde lo dejaste,
                      podrás retomar la evaluación desde la pregunta{" "}
                      <strong>#{currentQuestion}</strong>.
                    </p>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={onRecover}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base font-semibold"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Continuar donde quedé
                      </Button>
                    </motion.div>

                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={onStartFresh}
                        variant="outline"
                        className="w-full py-6 text-base font-semibold border-2"
                      >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Comenzar de nuevo
                      </Button>
                    </motion.div>
                  </div>

                  {/* Nota adicional */}
                  <p className="text-xs text-center text-gray-500">
                    El progreso guardado se elimina automáticamente después de 7 días
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
