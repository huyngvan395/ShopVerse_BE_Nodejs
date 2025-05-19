import OrderService from '../services/OrderService.js';

class OrderController {

    async createOrderBuyNow(req, res) {
        try {
            const userId = req.params.id;
            const { productId, quantity } = req.body;
            const newOrder = await OrderService.createOrderBuyNow(userId, productId, quantity);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createOrderCart(req, res) {
        try {
            const userId = req.params.id;
            const newOrder = await OrderService.createOrderCart(userId);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const userId = req.params.id;
            const orders = await OrderService.getAllOrders(userId);
            if (!orders) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrder(req, res) {
        try {
            const orderId = req.params.id;
            const updatedData = req.body;
            const updatedOrder = await OrderService.updateOrder(orderId, updatedData);
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;
            const deletedOrder = await OrderService.deleteOrder(orderId);
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrderCount(req, res){
        try {
            const userId = req.params.id;
            const count = await OrderService.getOrderCount(userId);
            res.status(200).json(count);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new OrderController();