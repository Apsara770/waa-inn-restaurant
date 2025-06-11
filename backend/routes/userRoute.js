import express from "express";
import { loginUser, registerUser, getAllUsers, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Route for user registration
userRouter.post("/register", registerUser);

// Route for user login
userRouter.post("/login", loginUser);

// Route for getting all users
userRouter.get("/all", getAllUsers);

// Route to delete a user
userRouter.delete("/:id", deleteUser);



export default userRouter;
