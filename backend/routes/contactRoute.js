import express from 'express';
import {
  sendMessage,
  getAllMessages,
  replyToMessage,
  deleteMessage
} from '../controllers/contactController.js';

const router = express.Router();

// Route for sending a contact message (Public)
router.post("/", sendMessage);

// Route for getting all contact messages (Admin only)
router.get("/", getAllMessages);

// Route for replying to a contact message (Admin only)
router.post("/reply", replyToMessage);

// Route for deleting a contact message (Admin only)
router.delete("/:id", deleteMessage);

export default router;
