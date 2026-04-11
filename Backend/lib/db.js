import mongoose from "mongoose";
require ('dotenv').config();

const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewParser:true,
            useUnifiedTopology:true,
        });
        console.log("Mongodb Connected");
    }catch(error){
        console.error(error.message);
        process.exit(1)
    }
};