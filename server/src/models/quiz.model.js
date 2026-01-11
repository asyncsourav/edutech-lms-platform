

import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    moduleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modules"
    },
    questions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Questions"
        }
    ],
}, { timestamps: true })

// made the Quiz model and exported it
export const Quiz = mongoose.model("Quiz", quizSchema);
