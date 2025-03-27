import mongoose from "mongoose"

const messages = mongoose.Schema(
    {
        userID : {
            type : String,
            
        },

        messages : {
            type : String,

        },


    }
);