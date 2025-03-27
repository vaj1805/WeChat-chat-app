import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if(!fullName || !email || !password) {
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
        console.log("Error in signup controller" , error.message);
        res.status(500).json({message : "Internal Server error"});
    }
};

export const login = async (req, res) => {
    const { email , password } = req.body;
    try {
        const user = await User.findOne({});

        if(!user) return res.status(400).json({message : "Invalid credentials"});
    }
    catch(error) {
        return res.status(400).json()
    }
    //res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};


//hash password -> using bcrypt lib.
//why ? for security and hash pass.
//1. create user 2. hash pwd . 3. create a token for authentication.