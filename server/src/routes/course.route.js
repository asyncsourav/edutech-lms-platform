

import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/upload.js';
import { createCourse, getAllPurchasedCourse, getCourse, getPurchasedCourse, getSingleCourse, editCourse, hideCourse, deleteCourse, getAllCourses } from '../controllers/course.controller.js';


const courseRoute = express.Router();


courseRoute.post('/createCourse', protectRoute, adminRoute, upload.single("thumbnail"), createCourse);
courseRoute.get('/getAllCourses', protectRoute, adminRoute, getAllCourses);  // Admin only - gets all courses including hidden
courseRoute.get('/getCourse', protectRoute, getCourse);  // Users - gets only visible courses
courseRoute.get('/getSingleCourse/:id', protectRoute, getSingleCourse);
courseRoute.get('/purchasedCourse/:id', protectRoute, getPurchasedCourse);
courseRoute.get('/getAllCoursePurchase', protectRoute, getAllPurchasedCourse);
courseRoute.put('/editCourse/:id', protectRoute, adminRoute, upload.single("thumbnail"), editCourse);
courseRoute.patch('/hideCourse/:id', protectRoute, adminRoute, hideCourse);
courseRoute.delete('/deleteCourse/:id', protectRoute, adminRoute, deleteCourse);


export default courseRoute;

