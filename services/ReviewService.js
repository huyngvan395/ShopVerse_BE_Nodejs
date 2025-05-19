import BaseService from "./BaseService";
import { Review, User } from "../models/index.js"; // Adjust the import path as necessary

class ReviewService extends BaseService{
    constructor(){
        super(Review)
    }

    async getAllReviews(productId){
        try{
            const reviews = await this.findAll({
                where: {
                    productId: productId
                },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "avatar"],
                    },
                ],
            })
            return reviews;
        } catch(error){
            console.log("Error fetching reviews(ReviewService): ", error);
            throw error;
        }
    }

    async addReview(userId, productId, rating, comment){
        try{
            const review = await this.create({
                userId,
                productId,
                rating,
                comment,
            })
            return review;
        } catch(error){
            console.log("Error adding review(ReviewService): ", error);
            throw error;
        }
    }   

}

export default new ReviewService();