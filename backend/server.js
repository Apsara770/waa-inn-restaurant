import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import contactRouter from "./routes/contactRoute.js";
import cartRouter from "./routes/cartRoute.js";
import reviewRouter from "./routes/reviewRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";
import invoiceRoutes from './routes/invoiceRoutes.js';
import reportRoutes from './routes/reportRoutes.js';


// Enable __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // hosting port
// const port = 4000; // local development port

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);
app.use("/api/cart", cartRouter);
app.use("/api/reviews", reviewRouter); 
app.use("/api/order", orderRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/invoice", invoiceRoutes);
app.use('/api/reports', reportRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
