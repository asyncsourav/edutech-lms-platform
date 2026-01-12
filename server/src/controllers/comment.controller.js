

import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Modules } from "../models/modules.model.js";



// Creating new comments
export const createComment = async (req, res) => {
    try {
        const moduleId = req.params.id;
        const { comment } = req.body;
        const userId = req.user._id;

        // Validate moduleId
        if (!mongoose.Types.ObjectId.isValid(moduleId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid module ID",
            });
        }

        // Validate comment
        if (!comment || !comment.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment is required",
            });
        }

        // Check if module exists
        const module = await Modules.findById(moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module not found",
            });
        }

        // Create comment
        const newComment = await Comment.create({
            userId,
            moduleId,
            comment,
        });

        // Push comment into module
        await Modules.findByIdAndUpdate(moduleId, {
            $push: { comments: newComment._id },
        });

        // Populate user details
        const populatedComment = await Comment.findById(newComment._id)
            .populate("userId", "fullName email");

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: populatedComment,
        });

    } catch (error) {
        console.log("createComment error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

