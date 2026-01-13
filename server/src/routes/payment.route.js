

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckOutSession } from "../controllers/payment.controller.js";


const paymentRoute = express.Router();

paymentRoute.post('/checkout', protectRoute, createCheckOutSession);
paymentRoute.post('/checkout-success', checkoutSuccess);


export default paymentRoute;

