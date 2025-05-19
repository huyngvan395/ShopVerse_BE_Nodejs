import ReviewService from "../services/ReviewService.js";

class ReviewController {
    async getAllReviews(req, res) {
        const { productId } = req.params;
        try {
            const reviews = await ReviewService.getAllReviews(productId);
            return res.status(200).json(reviews);
        } catch (error) {
            console.error("Error fetching reviews(ReviewController): ", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async addReview(req, res) {
        const { productId } = req.params;
        const { rating, comment } = req.body;
        try {
            const review = await ReviewService.addReview(
                req.user.id,
                productId,
                rating,
                comment
            );
            return res.status(201).json(review);
        } catch (error) {
            console.error("Error adding review(ReviewController): ", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }   

}