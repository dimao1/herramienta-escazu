"use client"

import { useState, useEffect } from "react"
import { CharacterizationForm } from "@/components/characterization-form"
import { QuizLayout } from "@/components/quiz-layout"
import { QuestionCard } from "@/components/question-card"
import { ResultsPage } from "@/components/results-page"
import { questionsData, modulesData, responseOptionsData } from "@/lib/questions-data"

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
  contact: string // Mantener para compatibilidad
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
  const [modules] = useState<Module[]>(modulesData)
  const [questions] = useState<Question[]>(questionsData)
  const [responseOptions] = useState<ResponseOption[]>(responseOptionsData)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<UserResponse[]>([])
  const [score, setScore] = useState(0)

  // Calculate score whenever responses change
  useEffect(() => {
    let totalScore = 0
    let questionsIncluded = 0

    console.log("Recalculating score with responses:", responses)

    responses.forEach((response) => {
      if (response.response_option_id) {
        const option = responseOptions.find((opt) => opt.id === response.response_option_id)
        console.log("Processing response for scoring:", { response, option })

        if (option && !option.excludes_from_calculation) {
          totalScore += option.points
          questionsIncluded += 1
          console.log(`Added ${option.points} points, total now: ${totalScore}`)
        }
      }
    })

    console.log("Final score calculation:", { totalScore, questionsIncluded })
    setScore(totalScore)
  }, [responses, responseOptions])

  const handleCharacterizationSubmit = (data: CharacterizationData) => {
    const newUser: User = {
      id: Date.now(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      entity: data.entity,
      municipality: data.municipality,
      contact: `${data.phone} / ${data.email}`, // Combinar teléfono y email
    }

    setUser(newUser)
    setAppState("quiz")
  }

  const handleAnswer = (
    questionId: number,
    responseOptionId?: number,
    openResponse?: string,
    justification?: string,
  ) => {
    console.log("handleAnswer called with:", { questionId, responseOptionId, openResponse, justification })

    const newResponse: UserResponse = {
      questionId,
      response_option_id: responseOptionId,
      open_response: openResponse,
      justification,
    }

    setResponses((prev) => {
      // Remove any existing response for this question
      const filtered = prev.filter((r) => r.questionId !== questionId)
      // Add the new response
      const updatedResponses = [...filtered, newResponse]

      console.log("Updated responses array:", updatedResponses)
      return updatedResponses
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Quiz completed, go to results
      console.log("Quiz completed, going to results with responses:", responses)
      setAppState("results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  if (appState === "characterization") {
    return <CharacterizationForm onSubmit={handleCharacterizationSubmit} />
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
    console.log("Rendering results page with:", { responses, user })
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
    </div>
  )
}
