

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


// controller for registering an user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body.trim();
        // if any field is missing
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required",
            });
        }
        // if there is already an existing user with the email
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email",
            });
        }
        // creating the new user with hased password
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        // success message
        return res.status(201).json({
            success: true,
            message: "User created Successfully"
        });
        
    } catch (error) {
        // failed to create user
        console.error("Error message: ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to register",
        });
    }
}



// controller for logging in an user
export const login = async(req, res) => {
    try{
        const { email, password } = req.body.trim();
        // if any field is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required",
            });
        }
        // if user doesnot exist 
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if(!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }
        // if the password is not same
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        // setting up the JWT token 
        generateToken(res, existingUser, `Welcome back ${existingUser.name}`);
        
    } catch (err) {
        // failed to login
        console.error("Error message: ", err);
        return res.status(500).json({
            success: false,
            message: "Failed to login the user",
        });
    }
}