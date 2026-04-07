const pdfParse = require("pdf-parse")
const generateinterviewReport = require("../service/ai.service")
const interviewModel = require("../models/interviewReport.model")

async function generateInterviewController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interviewReportByAi = await generateinterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "interview report generated successfully",
        report: interviewReport
    })
}

module.exports = { generateInterviewController }