import {DataTypes } from "sequelize";
import userModel from "./User.js";
import productModel from "./Product.js"
import categoryModel from "./Category.js";
import orderModel from "./Order.js";
import orderItemModel from "./OrderItem.js";
import postModel from "./Post.js";
import commentModel from "./Comment.js";
import reviewModel from "./Review.js";
import cartModel from "./Cart.js";
import cartItemModel from "./CartItem.js";
import followModel from "./Follow.js";
import addressModel from "./Address.js";
import favouriteModel from "./Favourite.js";
import sequelize from "../configs/database.js"

const User = userModel(sequelize, DataTypes);
const Product = productModel(sequelize, DataTypes);
const Category = categoryModel(sequelize, DataTypes);
const Order = orderModel(sequelize, DataTypes);
const OrderItem = orderItemModel(sequelize, DataTypes);
const Post = postModel(sequelize, DataTypes);
const Comment = commentModel(sequelize, DataTypes);
const Review = reviewModel(sequelize, DataTypes);
const Cart = cartModel(sequelize, DataTypes);
const CartItem = cartItemModel(sequelize, DataTypes);
const Follow = followModel(sequelize, DataTypes);
const Address = addressModel(sequelize, DataTypes);
const Favourite = favouriteModel(sequelize, DataTypes);

// User associations
User.hasMany(Order, { foreignKey: "userId", as: "order" });
User.hasMany(Post,  { foreignKey: "userId", as: "post" });
User.hasMany(Comment, { foreignKey: "userId", as: "comment" });
User.hasMany(Review, { foreignKey: "userId", as: "review" });
User.hasOne(Cart, { foreignKey: "userId", as: "cart" });
User.hasMany(Follow, { foreignKey: "userId", as: "follow" });
User.hasMany(Address, { foreignKey: "userId", as: "address" });
User.hasMany(Favourite, { foreignKey: "userId", as: "favourite" });

// Product associations
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Product.hasMany(Review, { foreignKey: "productId", as: "review" });
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItem" });
Product.hasOne(Favourite, { foreignKey: "productId", as: "favourite" });

// Cart associations
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });
Cart.hasMany(CartItem, { foreignKey: "cartId", as: "cartItem" });

// CartItem associations
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Order associations
Order.belongsTo(User, { foreignKey: "userId", as: "user" });
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItem" });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Review associations
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Favourite associations
Favourite.belongsTo(User, { foreignKey: "userId", as: "user" });
Favourite.belongsTo(Product, { foreignKey: "productId", as: "product" });



export {User, Product, Category, Order, OrderItem, Post, Comment, Review, Cart, CartItem, Follow, Address, Favourite};

