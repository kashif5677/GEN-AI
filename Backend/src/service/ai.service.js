const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

const interviewReportSchema = z.object({

    matchScore: z.number().describe("match score"),


    technicalQuestions: z.array(z.object({
        question: z.string().describe("technical question"),
        intention: z.string().describe("intention"),
        answer: z.string().describe("answer")
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("behavioral question"),
        intention: z.string().describe("intention"),
        answer: z.string().describe("answer")
    })),
    skillGaps: z.array(z.object({
        skill: z.string().describe("skill"),
        severity: z.enum(["low", "medium", "high"]).describe("severity")
    })),
    preparationPlan: z.array(z.object({
        day: z.number().describe("day"),
        focus: z.string().describe("focus"),
        tasks: z.array(z.string()).describe("tasks")
    }))
})

async function generateinterviewReport({ resume, seldescribe, jobdescribe }) {

    const prompt = `Generate a resume based interview report for a job describe for a candidate.
                     Resume:${resume}
                    Self describe:${seldescribe}
                     Job describe:${jobdescribe}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "",
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log(JSON.parse(response.text))
}

module.exports = generateinterviewReport