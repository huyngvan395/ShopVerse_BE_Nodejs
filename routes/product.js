import express from "express"
import ProductController from "../controllers/ProductController.js";
import auth from "../middlewares/auth.js";

const router = express.Router()

router.get("/products/:id", ProductController.getAllProduct)
router.get("/:productId/:userId", ProductController.getProduct)
router.post("/add-favourite", ProductController.updateFavourite)
router.get("/products/wishlist/:id", ProductController.getProductWishList)
router.get("/products/wishlist/:id/count",ProductController.getWishListCount)
router.get("/products/:id/search/:search",ProductController.getProductBySearch)
router.get("/category/:categoryId/:userId", ProductController.getProductsByCategory)

export default router;