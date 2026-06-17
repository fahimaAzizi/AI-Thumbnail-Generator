import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error("MongoDB connection failed:", error.message);
    console.log("Server will start without database. API routes requiring DB will return errors until DB is available.");
  }
};

export const getIsConnected = () => isConnected;

export default connectDB;
