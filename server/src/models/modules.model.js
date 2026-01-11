
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    video:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    quiz:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
}, { timestamps: true })

// creating and exporting the Modules model
export const Modules = mongoose.model("Modules", moduleSchema);
