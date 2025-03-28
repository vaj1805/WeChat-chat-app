import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        //hashing using bcrypt, A salt is a random string of data. 
        // that is added to a password before it is hashed. This extra data makes the resulting hash unique.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,

        })

        if (newUser) {
            //generate jwt token.
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //this query filters user by email.
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id , res);

        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic,
        })
    }

    
    catch (error) {
        console.log("Error in login controller : " , error.message);
        res.status(500).json({message : "Internal server error"});
    }   
    //res.send("login route");
};

export const logout = async (req, res) => {
    //1 . cookie destroy or clear.
    try {
        res.cookie("jwt" , "" , {maxAge : 0});
        return res.status(200).json({message : "Logged out successfully"})
    }
    catch (error) {
        return res.status(500).json({message : "Internal server error"});
    }

    //res.send("logout route");
};

export const updateProfile = async (req , res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        //due to protect route function.

        if(!profilePic) {
            return res.status(400).json({message : "Profile pic is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        //update Profilepic attribute for authentic user.
        const updatedUser = await User.findByIdAndUpdate(userId , {profilePic : uploadResponse.secure_url} , {new : true});
        //by default findOneAndUpdate returns document before updation , if new = true is set.
        // this method instead gives you an object after update was applied.

        res.status(200).json(updatedUser);

    }   
    catch (error) {
        console.log("error in updating profile : " , error);
        res.status(500).json({message : "Internal server error"});
    }
};

export const checkAuth = (req , res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        console.log("Error in checkAuth controller" , error.message);
        res.status(500).json({message : "Internal server error"});
    }
}


//hash password -> using bcrypt lib.
//why ? for security and hash pass.
//1. create user 2. hash pwd . 3. create a token for authentication.