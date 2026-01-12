

import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js'
import { User } from '../models/user.model.js'


// if the user is loggedin or not
export const protectRoute = async (req, res, next) => {
    try {
        // if the requested user do not have any token 
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required - No token provided"
            });
        }

        // verify the token of the user 
        let decode;
        try {
            decode = jwt.verify(token, ENV.JWT_SECRET);
            if (!decode || !decode.userId) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token payload"
                });
            }     
        } catch (jwtError) {
            console.log("Authentication failed: ", jwtError);
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
                error: jwtError.message
            });
        }

        // setting up the req.user
        const user = await User.findById(decode.userId).select("-password") // this will not add password of the user 
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found or deleted"
            });
        }
        req.user = user;
        next();
        
    } catch (error) {
        // for debugging any errors
        console.log("protectRoute error ", error);
        res.status(401).json({
            success: false,
            message: "Authentication failed",
        })
    }
}



// check if the user is an admin or not 
export const adminRoute = async (req, res, next) => {
    try {
        if (req.user && req.user.email === ENV.ADMIN) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "admin access required"
            })
        }
    } catch (error) {
        console.error("AdminRoute error: ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to authenticate admin"
        })
    }
}


