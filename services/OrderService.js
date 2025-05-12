import BaseService from "./BaseService";
import { Order, User, Product } from "../models/index";

class OrderService extends BaseService{
    constructor(){
        super(Order)
    }

    async getAllOrders(options = {}){
        try{
            return await this.findAll({
                include: [
                    {
                        model: User,
                        as: "user",
                    },
                    {
                        model: Product,
                        as: "products",
                    }
                ],
                ...options
            })
        } catch(error){
            console.log("Error fetching orders: ", error);
            throw error;
        }
    }

    async getOrderById(orderId){
        try{
            const order = await this.findById(orderId, {
                include:[
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
        } catch(error){
            console.log("Error fetching order by id: ", error);
            throw error;
        }
    }
}