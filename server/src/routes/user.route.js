
import express from "express"
import { getUser, Login, Logout, Register } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const userRoute = express.Router();


userRoute.post("/register", Register);
userRoute.post("/login", Login);
userRoute.get("/getUser", protectRoute, getUser);
userRoute.post("/logout", protectRoute, Logout);


export default userRoute;
