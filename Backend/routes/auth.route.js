import express from "express";
import { login, signup, logout} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { onboard } from "../controllers/auth.controller.js";
// CREATE THE ROUTER
const router = express.Router()

router.post ("/signup", signup);
router.post ("/login", login);
router.post ("/logout", logout);

router.post ("/onboarding",protectRoute ,onboard);

//check if user is logged in or not  
router.get("/me",protectRoute, (req, res) => {
    res.status(200).json({success:true, user: req.user});
})

export default router;



// "fullName": "Dennis Liazula",
//   "email": "liazuladennis@gmail.com",
//   "password": "pussy123"

//   "fullName":  "Dennis Liazula",
//   "bio": "Am a full stack MERN Developer, DevOps Engineer, Blockchain Engineering",
//   "nativeLanguage": "Kiswahili, English",
//"learningLangguage": "Spanish",
//   "location": "Kenya"

// 
//   "fullName": "Racheal Kololi",
//  "email": "racheal@gmail.com",
//   "password": "racheal"
