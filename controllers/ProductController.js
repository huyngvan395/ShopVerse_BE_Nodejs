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
    
}

export default new ProductController();