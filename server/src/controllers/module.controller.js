

import { Course } from "../models/course.model.js";
import { Modules } from "../models/modules.model.js";
import { Comment } from "../models/comment.model.js";




// CREATE MODULE
export const createModule = async (req, res) => {
    try {
        const { courseId, title } = req.body;

        if (!courseId || !title) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please provide video",
            });
        }

        const videoUrl = req.file.path;
        const publicId = req.file.filename;

        const module = await Modules.create({
            courseId,
            title,
            video: videoUrl,
            videoPublicUrl: publicId,
        });

        await Course.findByIdAndUpdate(courseId, {
            $push: { modules: module._id },
        });

        return res.status(201).json({
            success: true,
            message: "Module created successfully",
            module,
        });

    } catch (error) {
        console.log("error from create module", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};





// GET SINGLE COURSE MODULE
export const getSingleCourseModule = async (req, res) => {
    try {
        const moduleId = req.params.id;

        if (!moduleId) {
            return res.status(400).json({
                success: false,
                message: "Please provide module id",
            });
        }

        const singleModule = await Modules.findById(moduleId)
            .populate({
                path: "comments",
                populate: {
                    path: "userId",
                    select: "fullName email",
                },
            });

        if (!singleModule) {
            return res.status(404).json({
                success: false,
                message: "Module not found",
            });
        }

        return res.status(200).json({
            success: true,
            module: singleModule,
        });

    } catch (error) {
        console.log(error, "from get single course module");
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};




// GET COMMENTS OF A MODULE
export const getComment = async (req, res) => {
    try {
        const moduleId = req.params.id;

        if (!moduleId) {
            return res.status(400).json({
                success: false,
                message: "Please provide module Id",
            });
        }

        const moduleData = await Modules.findById(moduleId).populate({
            path: "comments",
            populate: {
                path: "userId",
                select: "fullName email",
            },
            options: { sort: { createdAt: -1 } },
        });

        if (!moduleData) {
            return res.status(404).json({
                success: false,
                message: "Module not found",
            });
        }

        return res.status(200).json({
            success: true,
            comments: moduleData.comments,
        });

    } catch (error) {
        console.log(error, "from get comment");
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


