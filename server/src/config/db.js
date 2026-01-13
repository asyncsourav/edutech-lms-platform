

import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("Database connected successfully");

    } catch (error) {
        console.log("error from connectDB ", error.message);
        throw error; // Throw error instead of using res (which doesn't exist here)
    }
}

export default connectDB;

