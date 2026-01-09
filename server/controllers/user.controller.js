

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({
                success: false,
                message: "All field are required",
            });
        }

        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        
    } catch (error) {
        
    }
}