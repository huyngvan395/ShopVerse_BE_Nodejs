import express from 'express';
import CartController from '../controllers/CartController.js';
import Cart from '../models/Cart.js';

const router = express.Router();

router.post('/add-cart', CartController.addToCart);
router.get("/:id",CartController.getCart);
router.get("/:id/count", CartController.getCartCount);
router.post("/remove/:id", CartController.removeFromCart)
router.get("/:id/selected", CartController.getCartSelected);
router.post("/update/:id", CartController.updateCart)
router.get("/get-quantity-selected/:id", CartController.getQuantitySelected);
router.post("/update/selected/:id", CartController.updateSelected);
router.post("/update/all-selected/:id", CartController.updateSelectedAll);

export default router;