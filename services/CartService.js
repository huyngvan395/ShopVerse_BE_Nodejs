import BaseService from "./BaseService.js";
import ProductService from "./ProductService.js";
import { Cart, CartItem, Product, Review } from "../models/index.js";
import Sequelize from "sequelize";

class CartService extends BaseService {
    constructor() {
        super(Cart);
    }
    async addToCart(userId, productId, quantity) {
        try {
            console.log("CartService: ", userId, productId, quantity);
            let cart = await this.findOne({ userId: userId });
            let cartItem = await CartItem.findOne({
                where: {
                    cartId: cart.id,
                    productId: productId
                },
            });

            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                cartItem = await CartItem.create({
                    cartId: cart.id,
                    productId,
                    quantity,
                });
            }

            let product = await ProductService.getProductById(productId, userId);
            if (!product) {
                throw new Error("Sản phẩm không tồn tại");
            } else {
                if (product.stock < quantity) {
                    throw new Error("Không đủ hàng trong kho");
                }
            }
            return cartItem;
        } catch (error) {
            console.error("Lỗi thêm vào giỏ hàng: ", error);
            throw error;
        }
    }
    async getCart(userId) {
        try {
            const cart = await this.findOne({ userId: userId });
            if (!cart) {
                return null;
            }
            const cartItems = await CartItem.findAll({
                where: { cartId: cart.id },
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: {
                            include: [
                                "id",
                                "name",
                                "price",
                                "imageUrl",
                                [Sequelize.fn("COUNT", Sequelize.col("product.review.id")), "reviewCount"]
                            ]
                        },
                        include: [
                            {
                                model: Review,
                                as: "review",
                                attributes: [],
                            }
                        ]
                    },
                ],
                group: [
                    'cart_items.id',
                    'product.id',
                    'product.name',
                    'product.description',
                    'product.price',
                    'product.imageUrl',
                    'product.categoryId',
                    'product.rating',
                    'product.isFavourite',
                    'product.stock',
                    'product.createdAt',
                    'product.updatedAt'
                ]
            });
            return cartItems;
        } catch (error) {
            console.error("Lỗi lấy giỏ hàng(CartService): ", error);
            throw error;
        }
    }
    async getCartSelected(userId) {
        try {
            const cart = await this.findOne({ userId: userId });
            if (!cart) {
                return null;
            }
            const cartItems = await CartItem.findAll({
                where: { cartId: cart.id, isSelected: true },
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: ["id", "name", "price", "imageUrl"],
                    },
                ],
            });
            return cartItems;
        } catch (error) {
            console.error("Lỗi lấy giỏ hàng đã chọn(CartService): ", error);
            throw error;
        }
    }
    async getCartCount(userId) {
        try {
            const cart = await this.findOne({ userId: userId });
            if (!cart) return 0;

            const result = await CartItem.findOne({
                where: { cartId: cart.id },
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'total']],
                raw: true,
            });

            return result.total ? parseInt(result.total) : 0;
        } catch (error) {
            console.error("Lỗi lấy số lượng giỏ hàng(CartService): ", error);
            throw error;
        }
    }
    async updateCart(cartItemId, quantity) {
        try {
            const cartItem = await CartItem.findByPk(cartItemId);
            if (!cartItem) {
                return null;
            }
            cartItem.quantity = quantity;
            await cartItem.save();
            return cartItem;
        } catch (error) {
            console.error("Lỗi cập nhật số lượng giỏ hàng(CartService): ", error);
            throw error;
        }
    }
    async updateSelected(cartItemId) {
        try {
            const cartItem = await CartItem.findByPk(cartItemId);
            if (!cartItem) {
                return null;
            }
            cartItem.isSelected = !cartItem.isSelected;
            await cartItem.save();
            return cartItem;
        } catch (error) {
            console.error("Lỗi cập nhật chọn sản phẩm thanh toán trong giỏ hàng(CartService): ", error);
            throw error;
        }
    }
    async updateSelectedAll(cartId, selected) {
        try {
            const cartItems = await CartItem.findAll({
                where: { cartId: cartId },
            });
            if (!cartItems) {
                return null;
            }
            for (const cartItem of cartItems) {
                cartItem.isSelected = selected;
                await cartItem.save();
            }
            return cartItems;
        } catch (error) {
            console.error("Lỗi cập nhật chọn tất cả trong giỏ hàng(CartService): ", error);
            throw error;
        }
    }
    async removeFromCart(cartItemId) {
        try {
            const cartItem = await CartItem.findByPk(cartItemId);
            if (!cartItem) {
                return null;
            }
            await cartItem.destroy();
            return cartItem;
        } catch (error) {
            console.error("Lỗi xóa sản phẩm khỏi giỏ hàng(CartService): ", error);
            throw error;
        }
    }
    async getQuantitySelected(userId) {
        try {
            const cart = await this.findOne({ userId: userId });
            if (!cart) {
                return null;
            }
            const cartItems = await CartItem.findAll({
                where: { cartId: cart.id, isSelected: true },
            });
            if (!cartItems) {
                return null;
            }
            let totalQuantitySelected = 0;
            for (const cartItem of cartItems) {
                totalQuantitySelected += 1;
            }
            return totalQuantitySelected;
        } catch (error) {
            console.error("Lỗi lấy số lượng sản phẩm đã chọn trong giỏ hàng(CartService): ", error);
            throw error;
        }
    }
}

export default new CartService();