import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req , res) => {
    try {
        const loggedInUserId = req.user._id;

        //basically we want to show friends of user on sidebar, 
        //in this mongo query . we find users from model with id other than the curr logged in user
        //for showing all user friends , and -password , for not showing there password, just other
        //remaining attributes.

        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password");

        return res.status(200).json(filteredUsers);

    }
    catch (error) { 
        console.log("Error in getUsersForSidebar : " , error.message);
        res.status(500).json({message : "Internal server error"});
    }
}


export const getMessages = async (req , res) => {
    try {
        const {id : userToChatId} = req.params;
        const myId = req.user._id;

        //send all messages  between both user and sender.
        const messages = await Message.find({
            $or:[
                {senderId : myId , recieverId : userToChatId},
                {senderId : userToChatId , recieverId : myId}
            ]
        })
        return res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in getMessages : " , error.message);
        res.status(500).json({message : "Internal server error"});
    }
}

export const sendMessage = async (req , res) => {
    try {
        const {text , image} = req.body;  
        const {id : recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            //upload base64 image on cloudinary.
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image : imageUrl,
        });

        await newMessage.save()   //save this msg in db.

        //realtime functionality here using socket.io

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller :" , error.message);
        res.status(500).json({message : "Internal server error"});
    }
}