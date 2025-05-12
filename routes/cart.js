import express from 'express';
import CartController from '../controllers/CartController.js';

const router = express.Router();

router.post('/add-cart', CartController.addToCart);
router.get("/:id",CartController.getCart);
router.get("/:id/count", CartController.getCartCount);
router.post("/remove/:id", CartController.removeFromCart)

export default router;