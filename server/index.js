
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";


const app = express();
dotenv.config({});
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
    connectDB();
});

