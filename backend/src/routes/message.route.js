import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controller.js";
import { getMessages , sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

//msg methods.

//get users for sidebar.
router.get("/users" , protectRoute , getUsersForSidebar);

router.get("/:id" , protectRoute , getMessages);

router.post("/send/:id" , protectRoute , sendMessage);

export default router;