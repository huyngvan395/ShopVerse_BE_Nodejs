import OrderService from '../services/OrderService.js';

class OrderController{

    async createOrder(req, res) {
        try {
            const orderData = req.body;
            const newOrder = await OrderService.createOrder(orderData);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrder(req, res) {
        try {
            const orderId = req.params.id;
            const order = await OrderService.getOrder(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
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
}