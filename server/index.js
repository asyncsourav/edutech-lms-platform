
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ENV } from "./src/config/env.js";
import connectDB from "./src/config/db.js";

import userRoute from "./src/routes/user.route.js";
import courseRoute from "./src/routes/course.route.js";



// setting up the server and using middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}));



// routing the api
app.use("/api", userRoute);
app.use("/api", courseRoute);




// connect db and starting server
connectDB()
    .then(() => {
        // starting server after db connection 
        app.listen(ENV.PORT, () => {
            console.log(`Server running on port ${ENV.PORT}`);
        });
    })
    .catch(err => {
        console.error({ message: "Error connecting to the database", error: err });
        process.exit(1);
    });

