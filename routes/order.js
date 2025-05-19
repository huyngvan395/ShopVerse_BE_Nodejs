import express from 'express';
import OrderController from '../controllers/OrderController.js';
import Order from '../models/Order.js';

const router = express.Router();

router.post("/:id/buy-now/create", OrderController.createOrderBuyNow);
router.post("/:id/cart/create", OrderController.createOrderCart);
router.get("/:id", OrderController.getAllOrders);
router.get("/:id/count", OrderController.getOrderCount);

export default router;

