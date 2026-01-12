

import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createComment } from '../controllers/comment.controller.js';


const commentRoute = express.Router();


commentRoute.post('/createComment/:id', protectRoute, createComment);


export default commentRoute;

