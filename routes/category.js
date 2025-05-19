import express from 'express';
import CategoryController from '../controllers/CategoryController.js';

const router = express.Router();
router.get('/categories', CategoryController.getAllCategories);

export default router;