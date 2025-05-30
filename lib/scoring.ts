import type { ResponseOption } from "./database"

export function calculateScore(responses: Array<{ response_option: ResponseOption | null }>) {
  let totalScore = 0
  let questionsIncluded = 0

  responses.forEach((response) => {
    if (response.response_option) {
      if (!response.response_option.excludes_from_calculation) {
        totalScore += response.response_option.points
        questionsIncluded += 1
      }
    }
  })

  const maxPossibleScore = questionsIncluded * 3 // Maximum 3 points per included question
  const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0

  let classification = "Básico"
  if (percentage >= 85) {
    classification = "Avanzado"
  } else if (percentage >= 60) {
    classification = "Intermedio"
  }

  return {
    totalScore,
    maxPossibleScore,
    questionsIncluded,
    percentage: Math.round(percentage * 100) / 100,
    classification,
  }
}
