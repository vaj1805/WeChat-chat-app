import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

//const app = express();

dotenv.config()
const PORT = process.env.PORT

// For Express server
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//middleware for data recieve.
app.use(express.json());
app.use(cookieParser());  //for parsing cookies.
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

//Auth route
app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);


//app.listen when node+Express, but after using socket.io
server.listen(PORT , () => {
    console.log(`server started at port ${PORT}`);
    connectDB();
})



