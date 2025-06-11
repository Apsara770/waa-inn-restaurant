import mongoose from "mongoose";

// db connection function
export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://sandaminiweerasekara:20020821@cluster0.7klhz7m.mongodb.net/Waa-Inn")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));
};
