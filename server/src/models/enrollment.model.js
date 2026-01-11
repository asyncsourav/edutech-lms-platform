

import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    stripeSessionId:{
        type: String,
        required: true
    }
}, { timestamps: true })

// Creating and exporting the enrollment model
export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

