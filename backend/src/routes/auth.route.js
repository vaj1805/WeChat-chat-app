import express from "express"
import {signup , login , logout} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/auth.controller.js";
import { checkAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup" , signup)
router.post("/login" , login)
router.post("/logout" , logout)

router.put("/update-profile" , protectRoute , updateProfile);  //profile only to be updated by authenticated user.
//so protectRoute method.

router.get("/check" , protectRoute , checkAuth);
//check if user is autehnticated or not.

export default router;
