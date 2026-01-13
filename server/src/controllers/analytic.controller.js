

import { Course } from "../models/course.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";



// overall analytics
export const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();

    const salesData = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalEnrollments: { $sum: 1 },
                totalRevenue: { $sum: "$totalAmount" }
            }
        }
    ]);

    const {
        totalEnrollments = 0,
        totalRevenue = 0
    } = salesData[0] || {};

    return {
        users: totalUsers,
        courses: totalCourses,
        totalEnrollments,
        totalRevenue
    };
};



// get the anylytic data
export const getAnalyticsDataController = async (req, res) => {
    try {
        const data = await getAnalyticsData();
        return res.status(200).json(data);

    } catch (error) {
        console.error("Analytics error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch analytics data"
        });
    }
};





// get daily enrollment Data
export const dailyEnrollmentData = async (startDate, endDate) => {
    const dailyData = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt"
                    }
                },
                enrollments: { $sum: 1 },
                revenue: { $sum: "$totalAmount" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map(date => {
        const found = dailyData.find(item => item._id === date);
        return {
            date,
            enrollments: found?.enrollments || 0,
            revenue: found?.revenue || 0
        };
    });
};



