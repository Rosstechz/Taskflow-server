import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected ${connect.connection.host}`);
  } catch (error) {
    console.log(`Failed to Connect Database`, error);
  }
};

export default connectDb;
