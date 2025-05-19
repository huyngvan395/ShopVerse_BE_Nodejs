import ProductService from '../services/ProductService.js';

class ProductController{
    async getAllProduct(req, res){
        try{
            const products = await ProductService.getAllProducts({userId: req.params.id} );
            res.json(products);
        } catch(error){
            res.status(500).json({
                message: error.message,
            })
        }
    }
    async getProduct(req, res) {
        try{
            const productId = req.params.productId;
            const userId = req.params.userId; 
            const product = await ProductService.getProductById(productId,userId);
            res.json(product);
        } catch(error){
            res.status(404).json({
                message: error.message,
            })
        }
    }
    async updateFavourite(req, res) {
        try{
            const { productId, userId } = req.body;
            console.log("Product ID: ", productId);
            console.log("User ID: ", userId);
            const isFavourite = await ProductService.updateFavourite(productId,userId);
            res.json(isFavourite);
        } catch(error){
            res.status(404).json({
                message: error.message,
            })
        }
    }
    async getProductWishList(req, res) {
        try{
            const userId = req.params.id;
            const products = await ProductService.getProductWishList(userId);
            res.json(products);
        } catch(error){
            res.status(404).json({
                message: error.message,
            })
        }
    }
    async getWishListCount(req, res) {  
        try{
            const userId = req.params.id;
            const count = await ProductService.getWishListCount(userId);
            res.json(count);
        } catch(error){
            res.status(404).json({
                message: error.message,
            })
        }
    }
    async getProductBySearch(req, res) {   
        try{
            const search = req.params.search;
            const userId = req.params.id;
            const products = await ProductService.searchProducts(search,userId);
            res.json(products);
        } catch(error){
            res.status(404).json({
                message: error.message,
            })
        }
    }

    async getProductsByCategory(req, res) {
        try{
            const categoryId = req.params.categoryId;
            const userId = req.params.userId;
            const products = await ProductService.getProductsByCategory(categoryId,userId);
            res.json(products);
        } catch(error){
            res.status(404).json({
                message: error.message,
            })
        }
    }
    
}

export default new ProductController();