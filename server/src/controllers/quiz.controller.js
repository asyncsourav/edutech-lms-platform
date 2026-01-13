

import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";
import { Quiz } from "../models/quiz.model.js";
import { Questions } from "../models/questions.model.js";
import { Modules } from "../models/modules.model.js";
import { ENV } from "../config/env.js";



const genAi = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });




// CHECK IF QUIZ EXISTS FOR MODULE
export const checkQuiz = async (req, res) => {
    try {
        const moduleId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(moduleId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid module ID",
            });
        }

        const quiz = await Quiz.findOne({
            userId: req.user._id,
            moduleId,
        });

        return res.status(200).json({
            success: true,
            hasQuiz: !!quiz,
            quiz: quiz || null,
        });

    } catch (error) {
        console.log("from check quiz", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};




// GENERATE QUIZ USING AI
export const generateQuiz = async (req, res) => {
    try {
        const { moduleId, content } = req.body;

        if (!moduleId || !content) {
            return res.status(400).json({
                success: false,
                message: "Module ID and content are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(moduleId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid module ID",
            });
        }

        const existingQuiz = await Quiz.findOne({
            userId: req.user._id,
            moduleId,
        });

        if (existingQuiz && existingQuiz.questions.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Quiz already generated for this module",
            });
        }

        const newQuiz = await Quiz.create({
            userId: req.user._id,
            moduleId,
        });

        const prompt = `Generate exactly 10 technical multiple-choice questions for: ${content}

            Rules:
            - Each question must have exactly 4 options
            - One correct option
            - Include explanation
            - Return ONLY valid JSON (no markdown, no text)

            Format:
            {
                "questions": [
                    {
                    "question": "string",
                    "options": ["string","string","string","string"],
                    "correctOption": "string",
                    "explanation": "string"
                    }
                ]
            }`;

        const result = await model.generateContent(prompt);
        const rawText = result.response.text();

        const cleanText = rawText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        let parsed;
        try {
            parsed = JSON.parse(cleanText);
        } catch (err) {
            await Quiz.findByIdAndDelete(newQuiz._id);
            return res.status(500).json({
                success: false,
                message: "Failed to parse quiz data",
            });
        }

        const generatedQuestions = parsed.questions;

        if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
            await Quiz.findByIdAndDelete(newQuiz._id);
            return res.status(500).json({
                success: false,
                message: "No questions generated",
            });
        }

        const createdQuestions = [];

        for (const q of generatedQuestions) {
            const doc = await Questions.create({
                quizId: newQuiz._id,
                content: q.question,
                options: q.options,
                correctOption: q.correctOption,
                explanation: q.explanation,
            });
            createdQuestions.push(doc._id);
        }

        await Quiz.findByIdAndUpdate(newQuiz._id, {
            $push: { questions: { $each: createdQuestions } },
        });

        await Modules.findByIdAndUpdate(moduleId, {
            quiz: newQuiz._id,
        });

        return res.status(201).json({
            success: true,
            message: "Quiz generated successfully",
            quizId: newQuiz._id,
        });

    } catch (error) {
        console.log("error from generateQuiz", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};




// GET QUIZ WITH QUESTIONS
export const getQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid quiz ID",
            });
        }

        const quiz = await Quiz.findOne({
            _id: quizId,
            userId: req.user._id,
        }).populate("questions");

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }

        return res.status(200).json({
            success: true,
            quiz,
        });

    } catch (error) {
        console.log("getQuiz error", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


