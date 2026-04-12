import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {

        // check all input fields
        if(!email || !password || !fullName) {
            return res.status(400).json ({message: "All fields are required"});
        }

     //password length
        if (password.length < 6) {
            return res.status(400).json ({message: "Password must be at least 6 characters"})
        }

   // Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Invalid email format"
    });
}

   // check if user email already exits
   const existingUser = await User.findOne({email});
   if (existingUser) {
    return res.status(400).json ({message: "Email already exists, please use a diffrent email"});
   }

     // hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

   //create the user avator.placeholder.iran.lara.run
   const  idx = Math.floor(Math.random() * 100) + 1; //generate random numbers between 1-100
   const randomAvator = `https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=730f244f-17d8-4ceb-89de-d54b85d05ac2&query=Placeholder+avatar`

   const newUser = await User.create({
    email,
    fullName,
    password,
    profilePic: randomAvator,
});

   // create a JWT TOKEN
   const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY, {
    expiresIn: "7d"

   })

   //parse them to cookies
   res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,//prevents XSS attacks
    sameSite: "strict",// prevent csrf attacks
    secure: process.env.NODE_ENV === "production"
   })

   //send response
   res.status(201).json({success:true, user:newUser})
    }catch (error) {
       console.log("Error in SignUp Controller", error);
       res.status(500).json({message:"Internal Server Error"}); 
    }
    // res.send("Signup endpoint");    
}

export async function login(req, res) {

    try {
        //for user to login they need email and password 
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json ({message: "All fields are required"});
        }

        // check if email or passowrd is valid
        const user = await User.findOne({email});
        if (!user) return res.status(401).json({ message:"Invalid email or password"});

        //check if password is correct
        const isPasswordCorrect = await user.matchPassword(password);
        if(!password) return res.status(401).json({message:"Invalid email or password"});

        // create a JWT TOKEN
       const token = jwt.sign({userId:User._id},process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"

      })

   //parse them to cookies
   res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,//prevents XSS attacks
    sameSite: "strict",// prevent csrf attacks
    secure: process.env.NODE_ENV === "production"
   })

   res.status(200).json({success:true, user})

    }catch(error) {
      console.log("Error in Login Controller", error);
      res.status(500).json({message:"Internal Server Error"}); 
    }
    // res.send("Login endpoint");
}       
    
export  function logout(req, res) {
    //for logout just clear the user cookies
    // res.send("Logout endpoint");
     res.clearCookie("jwt")
     res.status(200).json({success:true, message:"Logout Successfully"});
}