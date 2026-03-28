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
    technicalQuestions: []

})