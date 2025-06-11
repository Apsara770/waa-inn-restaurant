import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendInvoiceEmail = async (to, filePath, orderId) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // from .env
      pass: process.env.EMAIL_PASS  // from .env
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Invoice for Order ID: ${orderId}`,
    text: `Dear customer,\n\nPlease find attached the invoice for your order at Waa Inn.\n\nThank you!`,
    attachments: [
      {
        filename: `Invoice_${orderId}.pdf`,
        path: filePath
      }
    ]
  };

  await transporter.sendMail(mailOptions);
};

export default sendInvoiceEmail;
