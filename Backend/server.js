import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js";
import cookieParse from "cookie-parser";
import cors from "cors";

dotenv.config();
//start the server and connect to the database
connectDB();
//start exress server
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // allow frontend to connect with cookies
}));
app.use(express.json());
app.use(cookieParse());

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);