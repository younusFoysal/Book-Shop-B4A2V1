import express from 'express';
import { OrderControllers } from './order.controller';


const router = express.Router();

router.post('/orders', OrderControllers.createOrder);
router.get('/orders/revenue', OrderControllers.CalculateRevenue)

export const OrderRoutes = router;
