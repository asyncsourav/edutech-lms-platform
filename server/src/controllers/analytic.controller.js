

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

