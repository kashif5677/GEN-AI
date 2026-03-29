const pdfParse = require("pdf-parse")
const generateinterviewReport = require("../service/ai.service")
const interviewModel = require("../models/interviewReport.model")

async function generateInterviewController(req, res) {
    const resumeFile = req.file

    const resumeContent = pdfParse(req.file.buffer)
    const { selfDescription, jobDescription } = req.body

    const interviewReportByAi = await generateinterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewModel.create({
        user: req.user.id
    })
}

module.exports = { generateInterviewController }