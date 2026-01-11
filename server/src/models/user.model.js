
import mongoose from "mongoose";

// creating a user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    purchasedCourse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    profilePhoto: {
        type: String,
        default: "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
    },

}, { timestamps: true })

// creating and exporting the user model
export const User = mongoose.model("User", userSchema);

