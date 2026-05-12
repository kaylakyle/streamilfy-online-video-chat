import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

//start server
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    // "https://your-frontend.vercel.app"
  ],
  credentials: true
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

export default app;


