import express from "express";
import { login, signup, logout} from "../controllers/auth.controller.js";
// CREATE THE ROUTER
const router = express.Router()

router.post ("/signup", signup);
router.post ("/login", login);
router.post ("/logout", logout);

export default router;



// "fullName": "Dennis Liazula",
//   "email": "liazuladennis@gmail.com",
//   "password": "pussy123"