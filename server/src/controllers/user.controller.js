

import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import cloudinary from "../config/cloudinary.js";



// Controller for registering a new user
export const Register = async (req, res) => {
    try {
        // Extract fields from request body
        const { fullName, email, password } = req.body;

        // Check if any required field is missing - use 400 Bad Request
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details"
            });
        }
        // Check if user already exists with this email
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // Hash the password with salt rounds 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in database
        const newUser = await User.create({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
        });
        // Generate JWT token 
        const token = jwt.sign({ userId: newUser._id }, ENV.JWT_SECRET, { expiresIn: "1d" });

        // Check if this is admin email and set admin flag
        if (newUser.email === ENV.ADMIN) {
            newUser.admin = true;
            await newUser.save();
        }
        // Set secure httpOnly cookie with 1 day expiry
        res.cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
        });
        // Send success response
        res.status(201).json({
            success: true,
            message: `welcome ${newUser.email === ENV.ADMIN ? 'admin:' : 'user:'} ${newUser.fullName}`
        });

    } catch (error) {
        // Log error for debugging
        console.log(`Error in register controller: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Failed to register user"
        });
    }
};




// Controller for logging in existing user
export const Login = async (req, res) => {
    try {
        // Extract fields from request body
        const { email, password } = req.body;

        // Check if any required field is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }
        // Find user by email (case-insensitive search)
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        // Verify password using bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        // Generate JWT token 
        const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: "1d" });

        // Set admin flag if matches admin email (save to DB)
        if (user.email === ENV.ADMIN) {
            user.admin = true;
            await user.save();
        }
        // Set secure httpOnly cookie
        res.cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
        });
        // Send success response
        res.status(200).json({
            success: true,
            message: `welcome back ${user.email === ENV.ADMIN ? 'admin' : 'user'} ${user.fullName}`
        });

    } catch (error) {
        // Log error for debugging
        console.log(`Error in login controller: ${error}`);
        res.status(500).json({
            success: false,
            message: "Failed to login user"
        });
    }
};




// controller for getting the data of the user
export const getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            });
        }
        return res.status(200).json(user);

    } catch (error) {
        // log error for debugging 
        console.error("Failed to getUser: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to get user data"
        });
    }
}




// controller for logout user - Clears the cookie
export const Logout = async (req, res) => {
    try {
        // Clear the httpOnly cookie by setting maxAge to 0
        res.cookie("token", "", {
            maxAge: 0, // Immediately expires
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax"
        }).status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};




// Controller for updating user profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName } = req.body;

        const updateData = {};

        if (fullName) {
            updateData.fullName = fullName;
        }

        // Safe file check
        if (req.file) {
            const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

            const uploadRes = await cloudinary.uploader.upload(base64, {
                folder: "profilePhoto",
            });

            if (!uploadRes?.secure_url) {
                return res.status(500).json({
                    success: false,
                    message: "Image upload failed"
                });
            }
            updateData.profilePhoto = uploadRes.secure_url;
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        console.error('Update Profile Error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
