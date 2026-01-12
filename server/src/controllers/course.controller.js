

import cloudinary from "../config/cloudinary.js";
import { ENV } from "../config/env.js";
import { Course } from "../models/course.model.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { User } from "../models/user.model.js";
import { Modules } from '../models/module.model.js';



const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });




// controller for creating a new course
export const createCourse = async (req, res) => {
    try {
        const { tittle, description, amount } = req.body;
        if (!tittle || !description || !amount) {
            return res.status(401).json({
                success: false,
                message: "please provide all the details"
            });
        }

        const thumbnail = req.file;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail is required",
            });
        }

        let imageUrl = "";
        const base64 = `data:${req.file.mimetype};base64,${thumbnail.buffer.toString("base64")}`;
        const uploadRes = await cloudinary.uploader.upload(base64, {
            folder: "lms"
        });
        imageUrl = uploadRes.secure_url;

        const newCourse = new Course.create({
            userId: req.user._id,
            tittle,
            description,
            thumbnail: imageUrl,
            amount
        });

        await newCourse.save();
        return res.status(201).json({
            success: true,
            message: "Course Created Successfully",
            newCourse
        });

    } catch (error) {
        // logging the error for debugging
        console.log("error in creating course: ", error);
        res.status(500).json({
            success: false,
            message: "failed to create the course"
        });
    }
}





// controller for getting the data of the course 
export const getCourse = async (req, res) => {
    try {
        const { search } = req.query;

        // If no search → return all courses
        if (!search || search.trim() === "") {
            const courses = await Course.find().lean();
            return res.status(200).json({
                success: true,
                courses,
                count: courses.length,
            });
        }

        const prompt = `You are an intelligent assistant for a learning management platform. Return ONLY ONE keyword from:
            - Artificial intelligence
            - MERN Stack
            - DevOps
            - Mobile Development

        User query: ${search}`;

        let aiText = "";
        try {
            const result = await model.generateContent(prompt);
            aiText =
                result?.response?.candidates?.[0]?.content?.parts?.[0]?.text
                    ?.trim()
                    .replace(/[`"\n]/g, "") || "";
        } catch (aiError) {
            console.log("AI failed, falling back to user search");
        }

        const searchTerm = aiText || search;

        // Escape regex
        const safeSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const courses = await Course.find({
            $or: [
                { title: { $regex: safeSearch, $options: "i" } },
                { description: { $regex: safeSearch, $options: "i" } },
            ],
        }).lean();

        return res.status(200).json({
            success: true,
            courses,
            count: courses.length,
            searchTerm,
        });

    } catch (error) {
        console.error("Get Course Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};




