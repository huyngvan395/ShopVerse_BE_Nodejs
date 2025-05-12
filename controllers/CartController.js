import CartService from '../services/CartService.js';

class CartController {
    async addToCart(req, res) {
        try {
            console.log(req.body);
            const { productId, quantity, userId } = req.body;
            const cartItem = await CartService.addToCart(userId, productId, quantity);
            res.status(201).json(true);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCart(req, res) {
        try {
            const cartItems = await CartService.getCart(req.params.id);
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCartSelected(req, res) {
        try {
            const cartItems = await CartService.getCartSelected(req.params.id);
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCartCount(req, res) {
        try {
            const count = await CartService.getCartCount(req.params.id);
            res.status(200).json(count);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCart(req, res) {
        try {
            const {quantity } = req.body;
            const updatedItem = await CartService.updateCart(req.user.id, quantity);
            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found in cart' });
            }
            res.status(200).json(true);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeFromCart(req, res) {
        try {
            const cartItemId = req.params.id;
            const removedItem = await CartService.removeFromCart(cartItemId);
            if (!removedItem) {
                return res.status(404).json(false);
            }
            res.status(200).json(true);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSelected(req, res) {
        try {
            const { selected } = req.body;
            const cartItemId = req.params.id;
            const updatedItem = await CartService.updateSelected(cartItemId, selected);
            if (!updatedItem) {
                return res.status(404).json(false);
            }
            res.status(200).json(true);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateSelectedAll(req, res) {
        try {
            const { selected } = req.body;
            const cartId = req.params.id;
            const updatedItems = await CartService.updateSelectedAll(cartId, selected);
            if (!updatedItems) {
                return res.status(404).json(false);
            }
            res.status(200).json(true);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default new CartController();