// routes/reportRoutes.js
import express from 'express';
import { generateSalesReport , generateOrdersReport , generateFoodPerformanceReport} from '../controllers/reportController.js';

const router = express.Router();

router.get('/sales/pdf', generateSalesReport);
router.get('/orders/pdf', generateOrdersReport);
router.get('/food-performance/pdf', generateFoodPerformanceReport);


export default router;
