

import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("Datbase connected successfully");

    } catch (error) {
        console.log("error from connectDB ", error.message);
        res.status(404).json({
            success: false,
            message: "error while connecting to database",
        })
    }
}

export default connectDB;

