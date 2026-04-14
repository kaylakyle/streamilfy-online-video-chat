import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        // check for token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        //  FIXED HERE (User not user)
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        // attach user to request
        req.user = user;

        next(); // move to controller
    } catch (error) {
        console.log("Error in protectRoute middleware:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};