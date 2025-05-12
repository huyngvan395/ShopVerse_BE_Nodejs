import express from "express"
import ProductController from "../controllers/ProductController.js";
import auth from "../middlewares/auth.js";

const router = express.Router()

router.get("/products/:id", ProductController.getAllProduct)
router.get("/:productId/:userId", ProductController.getProduct)

export default router;