
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


// setting up the server
const app = express();
dotenv.config({});
const PORT = process.env.PORT || 3000;

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true,
}));


// api routes
app.use("/api/v1/user", userRoute);


// connect db and starting server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
    connectDB();
});

