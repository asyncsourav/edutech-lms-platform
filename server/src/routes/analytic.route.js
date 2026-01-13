

import express from 'express'
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js'
import { getAnalyticsDataController, getDailyAnalyticsController } from '../controllers/analytic.controller.js'


const analyticRoute = express.Router();


analyticRoute.get('/getAnalytic', protectRoute, adminRoute, getAnalyticsDataController);
analyticRoute.get('/getDailyData', protectRoute, adminRoute, getDailyAnalyticsController);


export default analyticRoute;

