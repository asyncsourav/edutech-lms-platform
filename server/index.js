
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";


const app = express();
dotenv.config({});
const PORT = process.env.PORT || 3000;
app.use(express.json());


app.use("/api/v1/user", userRoute);


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
    connectDB();
});

