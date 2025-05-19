import CategoryService from "../services/CategoryService.js";

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    async getCategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const category = await CategoryService.getCategoryById(categoryId);
            res.json(category);
        } catch (error) {
            res.status(404).json({
                message: error.message,
            });
        }
    }
}

export default new CategoryController();