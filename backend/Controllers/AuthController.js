import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";

export const register = async (req, res) => {
    const {email, username, password} = req.body;
    
    try {
        if(!email || !password || !username) {
            throw new Error("All fields are required");
        }

        const userExists = await User.findOne({email});

        const userNameExists = await User.findOne({username})

        if(userExists) {
            throw new Error("User already exists");
        }

        if(userNameExists) {
            throw new Error("Username is already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto.randomInt(6);

        const user = new User({
            email,
            password: hashedPassword,
            username,
            verificationToken,
            verificationTokenExpiresAt: Date.now() +24*60*60*1000
        })

        await user.save();

        res.status(201).json({
            success:true,
            message: "User created successfully",
            user: {
                ...user,
                password: null
            }
        })

    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            throw new Error("Invalid credentials")
        }

        const passCheck = await bcrypt.compare(password, user.password);

        if(!passCheck) {
            throw new Error("Password does not match");
        }

        generateTokenAndSetCookies(res, user._id);

        user.lastLogin = new Date();

        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password:undefined,
            }
        });
    } catch (error) {
        console.log("error in login function")
        res.status(400).json({success: false, message: error.message})
    }


}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }

        res.status(200).json({success: true, user: {
            ...user._doc,
            password: undefined
        }});
    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(400).json({ success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Logged out successfully"})
}