import User from "../model/user.js";

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

    // check user sent correct email
    const emailRegex = /^[^\$@]+@[^\$@]+\.[$@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json ({message: "Invalid email format"});
    }

   // check if user email already exits
   const existingUser = await User.findOne({email});
   if (!existingUser) {
    return res.status(400).json ({message: "Email already exists, please use a diffrent email"});
   }

   //create the user avator.placeholder.iran.lara.run
   const  idx = Math.floor(Math.random() * 100) + 1; //generate random numbers between 1-100
   const randomAvator = ``

   const newUser = new User.Create ({
    email,
    fullName,
    password,
    profilePic: randomAvator,
   })

   // create a JWT TOKEN
    }catch (error) {
        
    }
    // res.send("Signup endpoint");    
}

export async function login(req, res) {
    res.send("Login endpoint");
}       
    
export  function logout(req, res) {
    res.send("Logout endpoint");
}