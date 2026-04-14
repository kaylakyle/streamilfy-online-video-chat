import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import cookieParse from "cookie-parser";

dotenv.config();
//start the server and connect to the database
connectDB();
//start exress server
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParse());

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//routes
app.use("/api/auth", authRoutes);