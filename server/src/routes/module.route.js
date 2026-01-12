

import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createModule, getComment, getSingleCourseModule } from "../controllers/module.controller.js";
import { videoUpload } from "../middleware/video.upload.js";

const moduleRoute = express.Router();


moduleRoute.post('/createModule', protectRoute, adminRoute, videoUpload.single('video'), createModule);
moduleRoute.get('/getModule/:id', protectRoute, getSingleCourseModule);
moduleRoute.get('/comment/:id', protectRoute, getComment);

export default moduleRoute;

