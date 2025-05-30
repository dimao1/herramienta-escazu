"use client"

import { useState, useEffect } from "react"
import { CharacterizationForm } from "@/components/characterization-form"
import { QuizLayout } from "@/components/quiz-layout"
import { QuestionCard } from "@/components/question-card"
import { ResultsPage } from "@/components/results-page"
import { AdminAccessButton } from "@/components/admin-access-button"

interface CharacterizationData {
  name: string
  phone: string
  email: string
  entity: string
  municipality: string
}

interface Module {
  id: number
  name: string
  description: string
  order_index: number
}

interface Question {
  id: number
  module_id: number
  question_text: string
  question_type: "statement" | "open"
  order_index: number
  recommendations: Record<string, string>
}

interface ResponseOption {
  id: number
  option_text: string
  points: number
  excludes_from_calculation: boolean
}

interface User {
  id: number
  name: string
  phone: string
  email: string
  entity: string
  municipality: string
  contact: string
}

interface UserResponse {
  questionId: number
  response_option_id?: number
  open_response?: string
  justification?: string
}

type AppState = "characterization" | "quiz" | "results"

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>("characterization")
  const [user, setUser] = useState<User | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [responseOptions, setResponseOptions] = useState<ResponseOption[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<UserResponse[]>([])
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      const [modulesRes, questionsRes, optionsRes] = await Promise.all([
        fetch("/api/modules"),
        fetch("/api/questions"),
        fetch("/api/response-options"),
      ])

      const [modulesData, questionsData, optionsData] = await Promise.all([
        modulesRes.json(),
        questionsRes.json(),
        optionsRes.json(),
      ])

      setModules(modulesData)
      setQuestions(questionsData)
      setResponseOptions(optionsData)
    } catch (error) {
      console.error("Error loading initial data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate score whenever responses change
  useEffect(() => {
    let totalScore = 0
    let questionsIncluded = 0

    responses.forEach((response) => {
      if (response.response_option_id) {
        const option = responseOptions.find((opt) => opt.id === response.response_option_id)

        if (option && !option.excludes_from_calculation) {
          totalScore += option.points
          questionsIncluded += 1
        }
      }
    })

    setScore(totalScore)
  }, [responses, responseOptions])

  const handleCharacterizationSubmit = async (data: CharacterizationData) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const userData = await response.json()

      const newUser: User = {
        id: userData.id,
        name: userData.name,
        phone: data.phone,
        email: data.email,
        entity: userData.entity,
        municipality: userData.municipality,
        contact: userData.contact,
      }

      setUser(newUser)
      setAppState("quiz")
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const handleAnswer = async (
    questionId: number,
    responseOptionId?: number,
    openResponse?: string,
    justification?: string,
  ) => {
    const newResponse: UserResponse = {
      questionId,
      response_option_id: responseOptionId,
      open_response: openResponse,
      justification,
    }

    setResponses((prev) => {
      const filtered = prev.filter((r) => r.questionId !== questionId)
      return [...filtered, newResponse]
    })

    // Guardar respuesta en la base de datos
    if (user) {
      try {
        await fetch("/api/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            question_id: questionId,
            response_option_id: responseOptionId,
            open_response: openResponse,
            justification,
          }),
        })
      } catch (error) {
        console.error("Error saving response:", error)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Quiz completed, save assessment and go to results
      saveAssessment()
      setAppState("results")
    }
  }

  const saveAssessment = async () => {
    if (!user) return

    let totalScore = 0
    let questionsIncluded = 0

    responses.forEach((response) => {
      if (response.response_option_id) {
        const option = responseOptions.find((opt) => opt.id === response.response_option_id)
        if (option && !option.excludes_from_calculation) {
          totalScore += option.points
          questionsIncluded += 1
        }
      }
    })

    const maxPossibleScore = questionsIncluded * 3
    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0

    let classification = "Básico"
    if (percentage >= 85) {
      classification = "Avanzado"
    } else if (percentage >= 60) {
      classification = "Intermedio"
    }

    try {
      await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          total_score: totalScore,
          max_possible_score: maxPossibleScore,
          percentage: Math.round(percentage * 100) / 100,
          classification,
        }),
      })
    } catch (error) {
      console.error("Error saving assessment:", error)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Cargando aplicación...</p>
        </div>
        <AdminAccessButton />
      </div>
    )
  }

  if (appState === "characterization") {
    return (
      <>
        <CharacterizationForm onSubmit={handleCharacterizationSubmit} />
        <AdminAccessButton />
      </>
    )
  }

  if (appState === "quiz" && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex]
    const currentResponse = responses.find((r) => r.questionId === currentQuestion.id)
    const currentModule = modules.find((m) => m.id === currentQuestion.module_id)

    return (
      <QuizLayout
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        score={score}
        title={currentModule?.name || "Evaluación"}
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
      </QuizLayout>
    )
  }

  if (appState === "results" && user) {
    return (
      <ResultsPage
        userId={user.id}
        user={user}
        responses={responses}
        questions={questions}
        responseOptions={responseOptions}
        modules={modules}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <p className="text-gray-600">Inicializando aplicación...</p>
      <AdminAccessButton />
    </div>
  )
}
