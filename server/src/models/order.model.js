

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    totalAmount: {
        type: Number,
        required: true
    },
    stripeSessionId: {
        type: String,
        unique: true
    }
}, { timestamps: true })

// creating and exporting the Order model
export const Order = mongoose.model("Order", orderSchema);

