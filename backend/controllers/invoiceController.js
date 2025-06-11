import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';

dotenv.config();

export const generateInvoice = async (req, res) => {
  const { orderId } = req.body;

  try {
    console.log("Generating invoice for order ID:", orderId);
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const filename = `invoice_${order._id}.pdf`;
    const invoicesDir = path.join('invoices');
    const filepath = path.join(invoicesDir, filename);

    fs.mkdirSync(invoicesDir, { recursive: true });

    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filepath);
    doc.pipe(writeStream);

    // Header
    doc
      .fontSize(24)
      .text('Waa Inn Family Restaurant', { align: 'center' })
      .moveDown(0.5);
    doc
      .fontSize(16)
      .text('Customer Invoice', { align: 'center', underline: true })
      .moveDown(1);

    // Invoice Info (Left) + Customer Info (Right)
    doc
      .fontSize(12)
      .text(`Invoice ID: ${order._id}`, 50, 150)
      .text(`Order Date: ${new Date(order.date).toLocaleDateString()}`, 50, 170)
      .text(`Status: ${order.status}`, 50, 190)
      .text(`Payment: ${order.payment ? 'Paid' : 'Not Paid'}`, 50, 210);

    doc
      .text(`Customer Name: ${order.address.firstname} ${order.address.lastname}`, 350, 150)
      .text(`Email: ${order.address.email}`, 350, 170)
      .text(`Phone: ${order.address.phone}`, 350, 190)
      .text(`Address: ${order.address.address}, ${order.address.city}`, 350, 210)
      .moveDown(2);

    // Draw a line separator
    doc.moveTo(50, 240).lineTo(550, 240).stroke();

    // Table Header
    doc
      .fontSize(12)
      .text('No.', 50, 260, { width: 50, align: 'left' })
      .text('Item Name', 100, 260, { width: 200, align: 'left' })
      .text('Quantity', 200, 260, { width: 100, align: 'right' })
      .text('Price (LKR)', 300, 260, { width: 100, align: 'right' })
      .text('Total (LKR)', 400, 260, { width: 100, align: 'right' });

    // Draw another line
    doc.moveTo(50, 275).lineTo(550, 275).stroke();

    // Table Rows
    let y = 290;
    order.items.forEach((item, index) => {
      doc
        .fontSize(11)
        .text(index + 1, 50, y)
        .text(item.name, 100, y)
        .text(item.quantity, 180, y, { width: 100, align: 'right' })
        .text(item.price.toFixed(2), 290, y, { width: 100, align: 'right' })
        .text((item.quantity * item.price).toFixed(2), 390, y, { width: 100, align: 'right' });

      y += 20;
    });

    // Total Amount
    doc
      .fontSize(13)
      .text(`Total Amount: LKR ${order.amount.toFixed(2)}`, 100, y + 20, { align: 'right' })
      .moveDown(2);

    // Footer
    doc
      .fontSize(12)
      .text('Thank you for ordering from Waa Inn Family Restaurant!', { align: 'left' })
      .text('We hope you enjoy your meal. Please visit us again!' , { align: 'left' });

    doc.end();

    writeStream.on('finish', async () => {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: order.address.email,
          subject: 'Your Invoice from Waa Inn Restaurant',
          text: 'Dear customer,\n\nPlease find attached your invoice.\n\nThank you for choosing Waa Inn!',
          attachments: [{ filename, path: filepath }]
        };

        await transporter.sendMail(mailOptions);
        console.log(`Invoice sent to ${order.address.email}`);
        return res.status(200).json({ success: true, message: 'Invoice generated and sent successfully.' });

      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return res.status(500).json({ success: false, message: 'Invoice generated but failed to send email' });
      }
    });

    writeStream.on('error', (writeErr) => {
      console.error("Error writing PDF file:", writeErr);
      return res.status(500).json({ success: false, message: 'Failed to write invoice PDF file' });
    });

  } catch (error) {
    console.error("Invoice generation error:", error);
    return res.status(500).json({ success: false, message: 'Internal server error while generating invoice' });
  }
};
