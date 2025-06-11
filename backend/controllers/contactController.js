import Contact from "../models/contactModel.js";
import nodemailer from 'nodemailer';

//    Send a new contact message
export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Error sending message");
  }
};

//     Get all contact messages to admin dashboard
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Failed to fetch messages");
  }
};

//  Reply to a contact message using email
export const replyToMessage = async (req, res) => {
  const { id, reply } = req.body;

  try {
    const message = await Contact.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Update the reply field in DB
    message.reply = reply;
    await message.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: 'Response from Waa Inn Family Restaurant',
      text: `Dear ${message.name},\n\nThank you for your message. Here's our reply:\n\n${reply}\n\nBest Regards,\nWaa Inn Family Restaurant`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reply sent and email notified." });
  } catch (error) {
    console.error("Error sending reply or email:", error);
    res.status(500).json({ message: "Failed to send reply or email." });
  }
};

//    Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
};
