

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    moduleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modules"
    },
    comment:{
        type: String,
        required: true
    },
}, { timestamps: true })

// Creating and exporting the Comment Model
export const Comment = mongoose.model("Comment", commentSchema)
