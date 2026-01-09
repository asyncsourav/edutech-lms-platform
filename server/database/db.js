
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected sucessfully");
    } catch (error) {
        console.log("Error", {
            message: error.message,
        });
    }
}

export default connectDB;