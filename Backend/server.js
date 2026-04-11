import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
// import authRoutes from "./routes/auth.js";

dotenv.config();
//start the server and connect to the database
connectDB();
//start exress server
const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

app.use("/api/auth", authRoutes);