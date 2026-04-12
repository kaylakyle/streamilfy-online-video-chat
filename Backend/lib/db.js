import mongoose from "mongoose";// enable connect to db
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);// connection failed
  }
};

export default connectDB;