// controllers/reportController.js
import PDFDocument from 'pdfkit';
import orderModel from '../models/orderModel.js';

/**
 * Generate Sales Report PDF
 * Fetches all paid orders and calculates total revenue and revenue by date.
 * Validates dates to avoid invalid date errors.
 */
export const generateSalesReport = async (req, res) => {
  try {
    // Fetch orders with payment completed
    const orders = await orderModel.find({ payment: true });

    // Calculate total revenue from all orders
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    // Aggregate revenue by order date (YYYY-MM-DD)
    const revenueByDate = {};
    orders.forEach(order => {
      // Attempt to get valid date from order.Date or order.createdAt
      const dateValue = order.date || order.createdAt;
      const dateObj = new Date(dateValue);

      // Only process if date is valid
      if (!isNaN(dateObj)) {
        const date = dateObj.toISOString().split('T')[0];
        revenueByDate[date] = (revenueByDate[date] || 0) + order.amount;
      } else {
        // Log invalid date for debugging
        console.warn(`Invalid date for order ID ${order._id}:`, dateValue);
      }
    });

    // Initialize PDF document
    const doc = new PDFDocument();

    // Set HTTP response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="SalesReport.pdf"');

    // Pipe PDF stream to response
    doc.pipe(res);

    // Add report title and summary
    doc.fontSize(20).text('Waa Inn - Sales Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Total Revenue: Rs. ${totalRevenue.toFixed(2)}`);
    doc.moveDown();
    doc.fontSize(16).text('Revenue Over Time (by Date):');
    doc.moveDown(0.5);

    // Add revenue by date details
    Object.entries(revenueByDate).forEach(([date, amount]) => {
      doc.fontSize(12).text(`${date}: Rs. ${amount.toFixed(2)}`);
    });

    // Finalize PDF and end stream
    doc.end();
  } catch (error) {
    console.error('Error generating sales report:', error);
    res.status(500).send('Error generating sales report');
  }
};

/**
 * Generate Orders Report PDF
 * Provides a summary of total orders and breakdown by order status.
 */
export const generateOrdersReport = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await orderModel.find();
    const totalOrders = orders.length;

    // Aggregate order counts by status
    const ordersByStatus = {};
    orders.forEach(order => {
      const status = order.status || "Unknown";
      ordersByStatus[status] = (ordersByStatus[status] || 0) + 1;
    });

    // Initialize PDF document
    const doc = new PDFDocument();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="OrdersReport.pdf"');
    doc.pipe(res);

    // Add report title and total orders summary
    doc.fontSize(20).text('Waa Inn - Orders Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Total Orders: ${totalOrders}`);
    doc.moveDown();
    doc.fontSize(16).text('Orders by Status:');
    doc.moveDown(0.5);

    // Add breakdown by status
    Object.entries(ordersByStatus).forEach(([status, count]) => {
      doc.fontSize(12).text(`${status}: ${count}`);
    });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('Error generating orders report:', error);
    res.status(500).send('Error generating orders report');
  }
};

/**
 * Generate Food Performance Report PDF
 * Analyzes ordered food items to find most and least popular items.
 */
export const generateFoodPerformanceReport = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await orderModel.find();

    // Count total quantity ordered per food item
    const foodCount = {};
    orders.forEach(order => {
      (order.items || []).forEach(item => {
        // Determine food name from multiple possible fields
        const name =
          item.foodName ||         // Primary name field
          item.name ||             // Fallback
          item.food?.name ||       // If populated reference
          "Unnamed Food";

        // Default quantity to 1 if not specified
        const qty = item.quantity || 1;

        // Accumulate quantity per food item
        foodCount[name] = (foodCount[name] || 0) + qty;
      });
    });

    // Sort foods by quantity descending (most ordered)
    const sortedFoods = Object.entries(foodCount).sort((a, b) => b[1] - a[1]);

    // Top 5 most ordered foods
    const topFoods = sortedFoods.slice(0, 5);

    // Bottom 5 least ordered foods
    const leastFoods = sortedFoods.slice(-5);

    // Initialize PDF document
    const doc = new PDFDocument();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="FoodPerformanceReport.pdf"');
    doc.pipe(res);

    // Add report title
    doc.fontSize(20).text('Waa Inn - Food Performance Report', { align: 'center' });
    doc.moveDown();

    // List most ordered items
    doc.fontSize(16).text('Most Ordered Food Items:');
    doc.moveDown(0.5);
    topFoods.forEach(([name, qty]) => {
      doc.fontSize(12).text(`${name}: ${qty} orders`);
    });

    doc.moveDown();

    // List least ordered items
    doc.fontSize(16).text('Least Ordered Food Items:');
    doc.moveDown(0.5);
    leastFoods.forEach(([name, qty]) => {
      doc.fontSize(12).text(`${name}: ${qty} orders`);
    });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('Error generating food performance report:', error);
    res.status(500).send('Error generating food performance report');
  }
};
