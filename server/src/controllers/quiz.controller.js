

import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";
import { Quiz } from "../models/quiz.model.js";
import { Questions } from "../models/question.model.js";
import { Modules } from "../models/module.model.js";
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


