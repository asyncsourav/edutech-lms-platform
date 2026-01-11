

import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    quizId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true
    },
    content:{
        type: String,
        required: true
    },
    options: [
        {
            type: String,
        }
    ],
    correctOption:{
        type: String,
    },
    explanation:{
        type: String
    }
}, { timestamps: true })

// Created and exported the Questions model
export const Questions = mongoose.model("Questions", questionSchema);
