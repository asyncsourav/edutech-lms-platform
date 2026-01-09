
import mongoose from "mongoose";

// creating the user Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "instructor"],
        default: "student",
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    photoUrl: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
}, { timestamps: true });

//  creating user model 
const User = mongoose.model("User", userSchema);

export default User;