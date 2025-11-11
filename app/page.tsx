"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroductionPage } from "@/components/introduction-page";
import { ModuleIntroduction } from "@/components/module-introduction";
import { CharacterizationForm } from "@/components/characterization-form";
import { QuizLayout } from "@/components/quiz-layout";
import { QuestionCard } from "@/components/question-card";
import { ResultsPage } from "@/components/results-page";
import {
  questionsData,
  modulesData,
  responseOptionsData,
} from "@/lib/questions-data";
import { AdminAccessButton } from "@/components/admin-access-button";
import { RecoveryDialog } from "@/components/recovery-dialog";

interface CharacterizationData {
  name: string;
  phone: string;
  email: string;
  entity: string;
  municipality: string;
}

interface Module {
  id: number;
  name: string;
  description: string;
  order_index: number;
}

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

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  entity: string;
  municipality: string;
  contact: string; // Mantener para compatibilidad
}

interface UserResponse {
  questionId: number;
  response_option_id?: number;
  open_response?: string;
  justification?: string;
}

type AppState = "introduction" | "characterization" | "module-intro" | "quiz" | "results";

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>("introduction");
  const [user, setUser] = useState<User | null>(null);
  const [modules] = useState<Module[]>(modulesData);
  const [questions] = useState<Question[]>(questionsData);
  const [responseOptions] = useState<ResponseOption[]>(responseOptionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [score, setScore] = useState(0);
  const [shownModuleIntros, setShownModuleIntros] = useState<Set<number>>(new Set());
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [savedProgress, setSavedProgress] = useState<any>(null);

  // Calculate score whenever responses change
  useEffect(() => {
    let totalScore = 0;
    let questionsIncluded = 0;

    console.log("Recalculating score with responses:", responses);

    responses.forEach((response) => {
      if (response.response_option_id) {
        const option = responseOptions.find(
          (opt) => opt.id === response.response_option_id,
        );
        console.log("Processing response for scoring:", { response, option });

        if (option && !option.excludes_from_calculation) {
          totalScore += option.points;
          questionsIncluded += 1;
          console.log(
            `Added ${option.points} points, total now: ${totalScore}`,
          );
        }
      }
    });

    console.log("Final score calculation:", { totalScore, questionsIncluded });
    setScore(totalScore);
  }, [responses, responseOptions]);

  // Auto-save: Guardar progreso automáticamente
  useEffect(() => {
    // Solo guardar si hay un usuario y no estamos en introduction
    if (user && appState !== "introduction" && appState !== "results") {
      const progressData = {
        user,
        appState,
        currentQuestionIndex,
        responses,
        score,
        shownModuleIntros: Array.from(shownModuleIntros),
        lastSaved: new Date().toISOString(),
      };

      localStorage.setItem("herramienta-escazu-progress", JSON.stringify(progressData));
      console.log("💾 Progreso guardado automáticamente:", progressData);
    }
  }, [user, appState, currentQuestionIndex, responses, score, shownModuleIntros]);

  // Cargar progreso guardado al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem("herramienta-escazu-progress");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Verificar que no sea muy antiguo (más de 7 días)
        const savedDate = new Date(parsed.lastSaved);
        const daysSinceLastSave = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysSinceLastSave < 7) {
          setSavedProgress(parsed);
          setShowRecoveryDialog(true);
          console.log("📂 Progreso guardado encontrado:", parsed);
        } else {
          // Limpiar progreso antiguo
          localStorage.removeItem("herramienta-escazu-progress");
          console.log("🗑️ Progreso antiguo eliminado");
        }
      } catch (error) {
        console.error("Error al cargar progreso guardado:", error);
        localStorage.removeItem("herramienta-escazu-progress");
      }
    }
  }, []); // Solo ejecutar al montar el componente

  const handleRecoverProgress = () => {
    if (savedProgress) {
      setUser(savedProgress.user);
      setAppState(savedProgress.appState);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setResponses(savedProgress.responses);
      setScore(savedProgress.score);
      setShownModuleIntros(new Set(savedProgress.shownModuleIntros || []));
      setShowRecoveryDialog(false);
      console.log("✅ Progreso recuperado exitosamente");
    }
  };

  const handleStartFresh = () => {
    localStorage.removeItem("herramienta-escazu-progress");
    setShowRecoveryDialog(false);
    setSavedProgress(null);
    console.log("🆕 Comenzando evaluación nueva");
  };

  const handleCharacterizationSubmit = (data: CharacterizationData) => {
    const newUser: User = {
      id: Date.now(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      entity: data.entity,
      municipality: data.municipality,
      contact: `${data.phone} / ${data.email}`, // Combinar teléfono y email
    };

    setUser(newUser);
    // Show module introduction for first module
    setAppState("module-intro");
  };

  const handleAnswer = (
    questionId: number,
    responseOptionId?: number,
    openResponse?: string,
    justification?: string,
  ) => {
    console.log("handleAnswer called with:", {
      questionId,
      responseOptionId,
      openResponse,
      justification,
    });

    const newResponse: UserResponse = {
      questionId,
      response_option_id: responseOptionId,
      open_response: openResponse,
      justification,
    };

    setResponses((prev) => {
      // Remove any existing response for this question
      const filtered = prev.filter((r) => r.questionId !== questionId);
      // Add the new response
      const updatedResponses = [...filtered, newResponse];

      console.log("Updated responses array:", updatedResponses);
      return updatedResponses;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const currentQuestion = questions[currentQuestionIndex];
      const nextQuestion = questions[currentQuestionIndex + 1];
      
      // Check if moving to a new module
      if (currentQuestion.module_id !== nextQuestion.module_id && !shownModuleIntros.has(nextQuestion.module_id)) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setAppState("module-intro");
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } else {
      // Quiz completed, go to results
      console.log(
        "Quiz completed, going to results with responses:",
        responses,
      );
      // Limpiar el progreso guardado al completar exitosamente
      localStorage.removeItem("herramienta-escazu-progress");
      console.log("✅ Evaluación completada - Progreso guardado eliminado");
      setAppState("results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Helper function to get question count by module
  const getModuleQuestionCount = (moduleId: number) => {
    return questions.filter((q) => q.module_id === moduleId).length;
  };

  const handleModuleIntroContinue = () => {
    const currentQuestion = questions[currentQuestionIndex];
    setShownModuleIntros(prev => new Set([...prev, currentQuestion.module_id]));
    setAppState("quiz");
  };

  if (appState === "introduction") {
    return (
      <>
        <RecoveryDialog
          show={showRecoveryDialog}
          userName={savedProgress?.user?.name || ""}
          lastSaved={savedProgress?.lastSaved || ""}
          currentQuestion={savedProgress?.currentQuestionIndex + 1 || 0}
          totalQuestions={questions.length}
          onRecover={handleRecoverProgress}
          onStartFresh={handleStartFresh}
        />
        <IntroductionPage onContinue={() => setAppState("characterization")} />
      </>
    );
  }

  if (appState === "characterization") {
    return <CharacterizationForm onSubmit={handleCharacterizationSubmit} />;
  }

  if (appState === "module-intro" && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const currentModule = modules.find((m) => m.id === currentQuestion.module_id);
    
    if (currentModule) {
      return (
        <ModuleIntroduction
          moduleId={currentModule.id}
          moduleName={currentModule.name}
          questionCount={getModuleQuestionCount(currentModule.id)}
          onContinue={handleModuleIntroContinue}
        />
      );
    }
  }

  if (appState === "quiz" && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const currentResponse = responses.find(
      (r) => r.questionId === currentQuestion.id,
    );
    const currentModule = modules.find(
      (m) => m.id === currentQuestion.module_id,
    );

    return (
      <QuizLayout
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        score={score}
        title={currentModule?.name || "Evaluación"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question={currentQuestion}
              responseOptions={responseOptions}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              showPrevious={currentQuestionIndex > 0}
              showNext={true}
              currentAnswer={currentResponse}
              currentQuestionIndex={currentQuestionIndex}
              questions={questions}
            />
          </motion.div>
        </AnimatePresence>
      </QuizLayout>
    );
  }

  if (appState === "results" && user) {
    console.log("Rendering results page with:", { responses, user });
    return (
      <ResultsPage
        userId={user.id}
        user={user}
        responses={responses}
        questions={questions}
        responseOptions={responseOptions}
        modules={modules}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <p className="text-gray-600">Inicializando aplicación...</p>
      <AdminAccessButton />
    </div>
  );
}
