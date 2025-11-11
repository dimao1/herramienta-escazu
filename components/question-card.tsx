"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

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

interface QuestionCardProps {
  question: Question;
  responseOptions: ResponseOption[];
  onAnswer: (
    questionId: number,
    responseOptionId?: number,
    openResponse?: string,
    justification?: string,
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
  showPrevious: boolean;
  showNext: boolean;
  currentAnswer?: {
    response_option_id?: number;
    open_response?: string;
    justification?: string;
  };
  currentQuestionIndex: number;
  questions: Question[];
}

export function QuestionCard({
  question,
  responseOptions,
  onAnswer,
  onNext,
  onPrevious,
  showPrevious,
  showNext,
  currentAnswer,
  currentQuestionIndex,
  questions,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string>(
    currentAnswer?.response_option_id?.toString() || "",
  );
  const [openResponse, setOpenResponse] = useState(
    currentAnswer?.open_response || "",
  );
  const [justification, setJustification] = useState(
    currentAnswer?.justification || "",
  );
  const [currentRecommendation, setCurrentRecommendation] =
    useState<string>("");

  const selectedResponseOption = responseOptions.find(
    (option) => option.id.toString() === selectedOption,
  );

  const needsJustification =
    selectedResponseOption &&
    (selectedResponseOption.option_text === "No" ||
      selectedResponseOption.option_text === "No aplica");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);

    // Get the recommendation for the selected option
    const option = responseOptions.find((opt) => opt.id.toString() === value);
    if (option && question.recommendations[option.option_text]) {
      setCurrentRecommendation(question.recommendations[option.option_text]);
    }

    // Immediately save the answer when option changes
    if (question.question_type === "statement") {
      console.log("Saving answer immediately:", {
        questionId: question.id,
        responseOptionId: Number.parseInt(value),
        justification: needsJustification ? justification : undefined,
      });

      onAnswer(
        question.id,
        Number.parseInt(value),
        undefined,
        needsJustification ? justification : undefined,
      );
    }
  };

  const handleJustificationChange = (value: string) => {
    setJustification(value);

    // Save answer when justification changes (for No/No aplica responses)
    if (selectedOption && needsJustification) {
      console.log("Saving answer with justification:", {
        questionId: question.id,
        responseOptionId: Number.parseInt(selectedOption),
        justification: value,
      });

      onAnswer(question.id, Number.parseInt(selectedOption), undefined, value);
    }
  };

  const handleOpenResponseChange = (value: string) => {
    setOpenResponse(value);

    // Save open response immediately
    if (question.question_type === "open") {
      console.log("Saving open response:", {
        questionId: question.id,
        openResponse: value,
      });

      onAnswer(question.id, undefined, value, undefined);
    }
  };

  const canProceed = () => {
    if (question.question_type === "statement") {
      // For statement questions, need selected option and justification if required
      return (
        selectedOption &&
        (!needsJustification || justification.trim().length > 0)
      );
    } else {
      // For open questions, need response text
      return openResponse.trim().length > 0;
    }
  };

  useEffect(() => {
    if (question.question_type === "open" && openResponse.trim()) {
      setCurrentRecommendation(question.recommendations.general || "");
    }
  }, [openResponse, question]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(currentAnswer?.response_option_id?.toString() || "");
    setOpenResponse(currentAnswer?.open_response || "");
    setJustification(currentAnswer?.justification || "");
    setCurrentRecommendation("");

    // Set initial recommendation if there's a current answer
    if (currentAnswer?.response_option_id) {
      const option = responseOptions.find(
        (opt) => opt.id === currentAnswer.response_option_id,
      );
      if (option && question.recommendations[option.option_text]) {
        setCurrentRecommendation(question.recommendations[option.option_text]);
      }
    } else if (
      question.question_type === "open" &&
      currentAnswer?.open_response
    ) {
      setCurrentRecommendation(question.recommendations.general || "");
    }
  }, [currentAnswer, question.id, responseOptions]);

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
          {question.question_text}
        </h2>
      </div>

      {/* Answer Options */}
      {question.question_type === "statement" ? (
        <div className="space-y-4">
          <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
            <div className="grid grid-cols-1 gap-3">
              {responseOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={option.id.toString()}
                    id={`option-${option.id}`}
                    className="text-green-600"
                  />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="flex-1 p-3 sm:p-4 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors text-sm sm:text-base"
                  >
                    {option.option_text} ({option.points}{" "}
                    {option.points === 1 ? "punto" : "puntos"})
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* Justification field for No/No aplica */}
          {needsJustification && (
            <div className="mt-3 sm:mt-4">
              <Label
                htmlFor="justification"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Justifique su respuesta: <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="justification"
                value={justification}
                onChange={(e) => handleJustificationChange(e.target.value)}
                placeholder="Explique por qué seleccionó esta opción..."
                className="mt-2 text-sm sm:text-base"
                rows={3}
                required={needsJustification}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <Label
            htmlFor="open-response"
            className="text-xs sm:text-sm font-medium text-gray-700"
          >
            Su respuesta: <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="open-response"
            value={openResponse}
            onChange={(e) => handleOpenResponseChange(e.target.value)}
            placeholder="Escriba su respuesta aquí..."
            className="mt-2 text-sm sm:text-base"
            rows={4}
            required
          />
        </div>
      )}

      {/* Recommendation */}
      {currentRecommendation && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">
                  Recomendación
                </h4>
                <p className="text-blue-700 text-xs sm:text-sm">{currentRecommendation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between gap-2 sm:gap-4 pt-4 sm:pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={!showPrevious}
          className="px-4 sm:px-6 md:px-8 text-sm sm:text-base"
        >
          Anterior
        </Button>

        <Button
          onClick={onNext}
          disabled={!canProceed()}
          className="px-4 sm:px-6 md:px-8 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
        >
          {currentQuestionIndex === questions.length - 1
            ? "Finalizar"
            : "Siguiente →"}
        </Button>
      </div>
    </div>
  );
}
