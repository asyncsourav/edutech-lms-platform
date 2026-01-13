


import mongoose from "mongoose";
import { ENV } from "../config/env.js";
import { stripe } from "../config/stripe.js";
import { Course } from "../models/course.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Enrollment } from "../models/enrollment.model.js";



// creating a checkout session
export const createCheckOutSession = async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || !products._id) {
            return res.status(400).json({
                success: false,
                message: "Course data is required",
            });
        }

        const courseId = products._id;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Check if already purchased
        const alreadyPurchased = await Enrollment.findOne({
            userId: req.user._id,
            courseId,
        });

        if (alreadyPurchased) {
            return res.status(409).json({
                success: false,
                message: "You already own this course",
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: course.title,
                            images: course.thumbnail ? [course.thumbnail] : [],
                        },
                        unit_amount: Math.round(course.amount * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${ENV.CLIENT_URL}/purchase?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ENV.CLIENT_URL}/cancel`,
            metadata: {
                userId: req.user._id.toString(),
                courseId: courseId.toString(),
            },
        });

        return res.status(201).json({
            success: true,
            sessionId: session.id,
            url: session.url,
        });

    } catch (error) {
        console.log("createCheckOutSession error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};





// if the checkout is success
export const checkoutSuccess = async (req, res) => {
    try {
        const sessionId = req.body.sessionId || req.query.session_id;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "Session ID is required",
            });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            return res.status(400).json({
                success: false,
                message: "Payment not completed",
            });
        }

        const { userId, courseId } = session.metadata;

        const order = await Order.findOneAndUpdate(
            { stripeSessionId: sessionId },
            {
                user: userId,
                course: courseId,
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId,
            },
            { upsert: true, new: true }
        );

        await Enrollment.findOneAndUpdate(
            { userId, courseId },
            { userId, courseId, stripeSessionId: sessionId },
            { upsert: true, new: true }
        );

        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { purchasedCourse: courseId } }
        );

        return res.status(200).json({
            success: true,
            message: "Payment successful",
            orderId: order._id,
        });

    } catch (error) {
        console.error("checkoutSuccess error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



