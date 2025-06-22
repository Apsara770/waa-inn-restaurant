import mongoose from "mongoose";

// db connection function
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;  // Get the URI from environment variables
  if (!uri) {
    console.error("MongoDB URI not found in environment variables");
    return;
  }

  await mongoose
    .connect(uri)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));
};
