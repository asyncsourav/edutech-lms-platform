

import cloudinary from "../config/cloudinary.js";
import { ENV } from "../config/env.js";
import { Course } from "../models/course.model.js";
import { GoogleGenerativeAI } from '@google/generative-ai'
import { User } from "../models/user.model.js"; 
import {Modules} from '../models/module.model.js'
const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({model:'gemini-2.5-flash'})




// controller for creating a new course
export const createCourse = async(req, res) => {
    try {
        const { tittle, description, amount } = req.body;
        const thumbnail = req.file;

        if (!tittle || !description || !amount) {
            res.status(401).json({
                success: false,
                message: "please provide all the details"
            });
        }

        let imageUrl = "";
        const base64 = `data:${req.file.mimetype};base64,${thumbnail.buffer.toString("base64")}`;
        const uploadRes = await cloudinary.uploader.upload(base64,{
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
            message:"Course Created Successfully",
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




