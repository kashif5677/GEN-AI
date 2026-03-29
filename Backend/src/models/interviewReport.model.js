const mongoose = require("mongoose")

/**
 * - job description Schema
 * - resume text
 * - self description
 * - match score
 * - Technical questions:
 *          [{
 *              question:"",
 *              intention:""
 *              answer:"", 
 *          }]
 * - Behavioral questions:
 *           [{
 *              question:"",
 *              intention:""
 *              answer:"", 
 *          }]
 * - skill gaps:
 *           [{
 *              skill:"",
 *              severity:{
 *                  type:String,
 *                  enum:["low","medium","high"
 *              l]}
 *        
 * - preparation plan:
 *          [{
 *           day:Number,
 *           focus:String,
 *           tasks:[String]
 * }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    questuon: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
}, {
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    questuon: {
        type: String,
        required: [true, "question is required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "skill is required"]
    },
    severity: {
        type: String,
        required: [true, "severity is required"],
        enum: ["low", "medium", "high"]
    }
}, { _id: false })

const prepationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "day is required"],
    },
    focus: {
        type: String,
        required: [true, "focus is required"],
    },
    tasks: [{
        type: String,
        required: [true, "task is required"],
    }]
})

const interviewReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, "job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [prepationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)

module.exports = interviewReportModel