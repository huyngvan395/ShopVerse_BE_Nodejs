import BaseService from "./BaseService.js";
import { Product, Category, Review, User, Favourite } from "../models/index.js";
import { Op } from "sequelize"
import Sequelize from "sequelize";

class ProductService extends BaseService {
    constructor() {
        super(Product)
    }

    async getAllProducts(options = {}) {
        try {
            return await this.findAll({
                include: [
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Favourite,
                        as: "favourite",
                        where: { userId: options.userId },
                        required: false,
                    }
                ],
                ...options
            })
        } catch (error) {
            console.log("Error fetching products(ProductService): ", error);
            throw error;
        }
    }

    async getProductById(productId, userId) {
        try {
            const product = await this.findById(productId, {
                include: [
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Favourite,
                        as: "favourite",
                        where: { userId: userId },
                        required: false,
                    }
                ],
            })
            return product;
        } catch (error) {
            console.log("Error fetching product by id(ProductService): ", error);
            throw error;
        }
    }

    async getProductWishList(userId) {
        try {
            const products = await this.findAll({
                include: [
                    {
                        model: Favourite,
                        as: "favourite",
                        where: { userId: userId },
                        required: true,
                    },
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Review,
                        as: "review",
                        attributes: [],
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.fn("COUNT", Sequelize.col("review.id")), "reviewCount"]
                    ]
                },
                group: [
                    'products.id',
                    'favourite.id',
                    'category.id'
                ]
            });
            return products;
        } catch (error) {
            console.log("Error fetching wishlist products (ProductService): ", error);
            throw error;
        }
    }

    async searchProducts(query,userId) {
        try {
            const products = await Product.findAll({
                where: {
                    [Op.or]: [{ name: { [Op.like]: `%${query}%` } }, { description: { [Op.like]: `%${query}%` } }],
                },
                include: [
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Favourite,
                        as: "favourite",
                        where: { userId: userId},
                        required: false,
                    }
                ]
            })
            return products;
        } catch (error) {
            console.log("Error searching product(ProductService): ", error);
            throw error;
        }
    }

    async getProductsByCategory(categoryId,userId) {
        try {
            return await this.findAll({
                where: { categoryId: categoryId },
                include: [
                    {
                        model: Category,
                        as: "category"
                    },
                    {
                        model: Favourite,
                        as: "favourite",
                        where: { userId: userId },
                        required: false,
                    }
                ]
            })
        } catch (error) {
            console.log("Error fetching products by category(ProductService): ", error);
            throw error;
        }
    }

    async updateFavourite(productId, userId) {
        try {
            const favourite = await Favourite.findOne({
                where: {
                    productId: productId,
                    userId: userId
                }
            })
            if (favourite) {
                await favourite.destroy();
                return false;
            } else {
                await Favourite.create({
                    productId: productId,
                    userId: userId
                })
                return true;
            }
        } catch (error) {
            console.log("Error updating favourite(ProductService): ", error);
            throw error;
        }
    }

    async getWishListCount(userId) {
        try {
            const count = await Favourite.count({
                where: {
                    userId: userId
                }
            })
            return count;
        } catch (error) {
            console.log("Error fetching wishlist count(ProductService): ", error);
            throw error;
        }
    }

}

export default new ProductService();
