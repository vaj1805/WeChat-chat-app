import jwt from "jsonwebtoken";

export const generateToken = (userId , res) => {

    const token = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn : "7d"  //token expires in 7d, after that user has to login again.
    });

    res.cookie("jwt" , token , {
        maxAge : 7*24*3600*1000,  //7days in ms.
        httpOnly : true,  //prevents XSS attacks.
        sameSite : "strict", // CSRF attacks cross site request forgery attacks.
        secure : process.env.NODE_ENV !== "development"
    });

    return token;
};