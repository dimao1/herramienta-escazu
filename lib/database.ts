import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL || "postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder?sslmode=require")

export interface Module {
  id: number
  name: string
  description: string
  order_index: number
}

export interface Question {
  id: number
  module_id: number
  question_text: string
  question_type: "statement" | "open"
  order_index: number
  recommendation: string
}

export interface ResponseOption {
  id: number
  option_text: string
  points: number
  excludes_from_calculation: boolean
}

export interface User {
  id: number
  name: string
  contact: string
  entity: string
  municipality: string
}

export interface Response {
  id: number
  user_id: number
  question_id: number
  response_option_id?: number
  open_response?: string
  justification?: string
}

export interface Assessment {
  id: number
  user_id: number
  total_score: number
  max_possible_score: number
  percentage: number
  classification: string
  completed_at: Date
}

export async function getModules(): Promise<Module[]> {
  const result = await sql`
    SELECT * FROM modules ORDER BY order_index
  `
  return result as Module[]
}

export async function getQuestionsByModule(moduleId: number): Promise<Question[]> {
  const result = await sql`
    SELECT * FROM questions 
    WHERE module_id = ${moduleId} 
    ORDER BY order_index
  `
  return result as Question[]
}

export async function getAllQuestions(): Promise<Question[]> {
  const result = await sql`
    SELECT * FROM questions 
    ORDER BY module_id, order_index
  `
  return result as Question[]
}

export async function getResponseOptions(): Promise<ResponseOption[]> {
  const result = await sql`
    SELECT * FROM response_options ORDER BY id
  `
  return result as ResponseOption[]
}

export async function createUser(userData: Omit<User, "id">): Promise<User> {
  const result = await sql`
    INSERT INTO users (name, contact, entity, municipality)
    VALUES (${userData.name}, ${userData.contact}, ${userData.entity}, ${userData.municipality})
    RETURNING *
  `
  return result[0] as User
}

export async function saveResponse(responseData: Omit<Response, "id">): Promise<Response> {
  const result = await sql`
    INSERT INTO responses (user_id, question_id, response_option_id, open_response, justification)
    VALUES (${responseData.user_id}, ${responseData.question_id}, ${responseData.response_option_id}, ${responseData.open_response}, ${responseData.justification})
    RETURNING *
  `
  return result[0] as Response
}

export async function saveAssessment(assessmentData: Omit<Assessment, "id" | "completed_at">): Promise<Assessment> {
  const result = await sql`
    INSERT INTO assessments (user_id, total_score, max_possible_score, percentage, classification)
    VALUES (${assessmentData.user_id}, ${assessmentData.total_score}, ${assessmentData.max_possible_score}, ${assessmentData.percentage}, ${assessmentData.classification})
    RETURNING *
  `
  return result[0] as Assessment
}

export async function getAssessmentWithResponses(userId: number) {
  const assessment = await sql`
    SELECT * FROM assessments WHERE user_id = ${userId} ORDER BY completed_at DESC LIMIT 1
  `

  const user = await sql`
    SELECT * FROM users WHERE id = ${userId}
  `

  const responses = await sql`
    SELECT r.*, q.question_text, q.recommendation, ro.option_text, ro.points, m.name as module_name
    FROM responses r
    JOIN questions q ON r.question_id = q.id
    JOIN modules m ON q.module_id = m.id
    LEFT JOIN response_options ro ON r.response_option_id = ro.id
    WHERE r.user_id = ${userId}
    ORDER BY m.order_index, q.order_index
  `

  return {
    assessment: assessment[0],
    user: user[0],
    responses,
  }
}
