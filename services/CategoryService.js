import BaseService from "./BaseService.js";
import { Category } from "../models/index.js";

class CategoryService extends BaseService{
    constructor(){
        super(Category)
    }
    async getAllCategories(){
        try{
            const categories = await this.findAll();
            return categories;
        } catch(error){
            console.log("Error fetching categories(CategoryService): ", error);
            throw error;
        }
    }

    async getCategoryById(categoryId){
        try{
            const category = await this.findById(categoryId);
            return category;
        } catch(error){
            console.log("Error fetching category by id(CategoryService): ", error);
            throw error;
        }
    }
}

export default new CategoryService();