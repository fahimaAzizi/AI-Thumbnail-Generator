import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("MongoDB connected");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;