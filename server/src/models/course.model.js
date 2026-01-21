

import mongoose from "mongoose";

// creating the course schema 
const courseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    modules: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Modules"
        }
    ],
    isHidden: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

// creating and exporting the course model
export const Course = mongoose.model("Course", courseSchema);

