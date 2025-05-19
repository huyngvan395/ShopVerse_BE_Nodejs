import BaseService from "./BaseService.js";
import { Order, User, Product, OrderItem, CartItem,Cart } from "../models/index.js";
import AddressService from "./AddressService.js";

class OrderService extends BaseService {
    constructor() {
        super(Order)
    }

    async getAllOrders(userId, options = {}) {
    try {
        return await Order.findAll({
            where: { userId: userId },
            include: [
                {
                    model: User,
                    as: "user",
                },
                {
                    model: OrderItem,
                    as: "orderItem",
                    include: [
                        {
                            model: Product,
                            as: "product",
                        }
                    ]
                }
            ],
            ...options
        });
    } catch (error) {
        console.log("Error fetching orders by userId (OrderService): ", error);
        throw error;
    }
}

    async getOrderById(orderId) {
        try {
            const order = await this.findById(orderId, {
                include: [
                    {
                        model: User,
                        as: "user",
                    },
                    {
                        model: Product,
                        as: "products",
                    },
                ],
            })
            return order;
        } catch (error) {
            console.log("Error fetching order by id(OrderService): ", error);
            throw error;
        }
    }

    async createOrderBuyNow(userId, productId, quantity) {
        try {
            const address = await AddressService.getDefaultAddress(userId);
            if (!address) throw new Error("Không tìm thấy địa chỉ mặc định!");

            const product = await Product.findByPk(productId);
            if (!product) throw new Error("Không tìm thấy sản phẩm!");

            const totalAmount = parseFloat(product.price) * quantity;

            const order = await this.create({
                userId,
                totalAmount,
                recipientName: address.name,
                recipientPhone: address.phone,
                shippingAddress: address.address,
                status: "Đang xử lý",
            });

            await OrderItem.create({
                orderId: order.id,
                productId,
                quantity,
                price: product.price,
            });

            return order;
        } catch (error) {
            console.log("Error creating order(OrderService): ", error);
            throw error;
        }
    }

    async createOrderCart(userId) {
        try {
            const address = await AddressService.getDefaultAddress(userId);
            if (!address) throw new Error("Không tìm thấy địa chỉ mặc định!");

            const cart = await Cart.findOne({
                where: {
                    userId:userId,
                },
            })
            if(!cart) throw new Error("Giỏ hàng không tồn tại!");
            const cartItems = await CartItem.findAll({
                where: {
                    cartId: cart.id,
                    isSelected: true,
                },
            });
            if (cartItems.length === 0) throw new Error("Không có sản phẩm được chọn!");

            let totalAmount = 0;

            for (const item of cartItems) {
                const product = await Product.findByPk(item.productId);
                if (!product) continue;
                totalAmount += parseFloat(product.price) * item.quantity;
            }

            const order = await this.create({
                userId,
                totalAmount,
                recipientName: address.name,
                recipientPhone: address.phone,
                shippingAddress: address.address,
                status: "Đang xử lý",
            });

            for (const item of cartItems) {
                const product = await Product.findByPk(item.productId);
                if (!product) continue;
                await OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                });
            }
            await CartItem.destroy({
                where: {
                    cartId: cart.id,
                    isSelected: true,
                },
            });

            return order;
        } catch (error) {
            console.log("Error creating order(Order Service): ", error);
            throw error;
        }
    }

    async getOrderCount(userId){
        try {
            const orderCount = await Order.count({
                where: {
                    userId: userId,
                },
            });
            return orderCount;
        } catch (error) {
            console.log("Error fetching order count(OrderService): ", error);
            throw error;
        }
    }
}

export default new OrderService();