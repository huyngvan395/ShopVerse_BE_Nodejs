import BaseService from "./BaseService.js";    
import {User, Post, Review, Follow, Order, Cart} from "../models/index.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class UserService extends BaseService {
    constructor() {
        super(User);
    }

    async register(userData){
        try{
            const existingUser = await this.findOne({
                email: userData.email,
            });
            if (existingUser){
                throw new Error("User already exists with this email");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt); 

            const user = await this.create({
                ...userData,
                password: hashedPassword,   
            })

            await Cart.create({userId: user.id})

            const userResponse = user.toJSON();
            delete userResponse.password; 

            return userResponse;

        } catch(error){
            console.error("Error registering user: ", error);
            throw error;
        }
    }

    async login(email, password){
        try{
            const user = await this.findOne({email})
            if(!user){
                return {error: "Email hoặc mật khẩu không đúng"}
            }

            const checkMatch = await bcrypt.compare(password, user.password);
            if(!checkMatch){
                return {error: "Email hoặc mật khẩu không đúng"}
            }

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            const userResponse = user.toJSON();
            delete userResponse.password;
            console.log("User found: ", userResponse);

            return {
                user: userResponse,
                token,
                msg:"Đăng nhập thành công"
            };
        } catch(error){
            console.error("Error logging in user: ", error);
            throw error;
        }
    }

    async getUserProfile(userId){
        try{
            const user = await this.findById(userId, {
                attributes: {exclude: ["password"]},
                include: [
                    {model: Post, as: "posts"},
                    {model: Review, as: "reviews"},
                    {model: Order, as: "orders"},
                    {model: Follow, as: "followers", attributes: ["id"]},
                    {model: Follow, as: "following", attributes: ["id"]},
                ]
            })
        } catch(error) {
            console.error("Error fetching user profile: ", error)
            throw error;
        }
    }

    async updateUserProfile(userId, userData){
        try{

            console.log("User data to update: ", userData);
            const updateUser = await this.update(userId, userData)

            const userResponse = updateUser.toJSON();
            console.log("User updated: ", userResponse);
            delete userResponse.password;

            return userResponse;
        } catch( error){
            console.error("Error updating user profile(UserService): ", error);
            throw error;
        }
    }

    async getFollowers(userId){
        try{
            const followers = await this.findAll({
                where: {userId},
                include: [{
                    model: User,  
                    as: "followers",
                    attributes:  {exclude: ["password"]},
                }]
            })

            return followers.map((follow) => follow.following)
        } catch(error){
            console.error("Error fetching followers: ", error);
            throw error;
        }
    }

    async getFollowing(userId){
        try{
            const following = await this.findAll({
                where: {followerid: userId},
                include: [{
                    model: User,
                    as: "following",
                    attributes: {exclude: ["password"]},
                }]
            })
            return following.map((follow) => follow.following)
        }catch(error){
            console.error("Error fetching following: ", error);
            throw error;
        }
    }

    async deleteAccount(userId){
        try{
            const deleted = await this.delete(userId);
            return deleted;
        } catch(error){
            console.error("Error deleting account: ", error);
            throw error;
        }
    }
}

export default new UserService();
