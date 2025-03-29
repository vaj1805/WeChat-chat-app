import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const app = express();

dotenv.config()
const PORT = process.env.PORT

//middleware for data recieve.
app.use(express.json());
app.use(cookieParser());  //for parsing cookies.
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
})
);

//Auth route
app.use("/api/auth" , authRoutes);
app.use("/api/message" , messageRoutes);

app.listen(PORT , () => {
    console.log(`server started at port ${PORT}`);
    connectDB();
})



