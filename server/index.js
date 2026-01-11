
import express from "express";
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";
import { ENV } from "./src/config/env.js";


// setting up the server and using middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))



// connect db and starting server
app.listen(ENV.PORT, () => {
    console.log(`Server started at port ${ENV.PORT}....`);
    
    // connecting to database after server starts
    connectDB().catch((err) => {
            console.error({ message: "Error connecting to the database", error: err });
            console.log("Server is running without database connection...");
        });
});

