class BaseService {
    constructor(model){
        this.model = model;
    }

    async findAll(options = {}) {
        try{
            return await this.model.findAll(options);
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    }

    async findById(id, options = {}) {
        try {
            const item = await this.model.findByPk(id, options);
            if(!item){
                throw new Error(`${this.model.name} with id ${id} not found`);
            }
            return item;
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
            
        }
    }

    async findOne(query, options = {}){
        console.log(">>> findOne called with:", query);
        if (!query.userId) {
            console.error(">>> ❌ userId bị undefined tại findOne()");
        }
        try{
            const item = await this.model.findOne({
                where: query,
                ...options
            });
            return item;
        } catch(error){
            console.error("Error fetching data: ", error);
            throw error;
        }
    }

    async create(data){
        try{
            return await this.model.create(data);
        } catch(error){
            console.error("Error creating data: ", error);
            throw error;
        }
    }

    async update(id, data){
        try{
            const [updated] = await this.model.update(data, {
                where: { id },
                returning: true,
            }) 
            if(updated === 0){
                throw new Error(`${this.model.name} with id ${id} not found`);
            }

            return this.findById(id);
        } catch(error){
            console.error("Error updating data: ", error);
            throw error;
        }
    }

    async delete(id){
        try{
            const deleted = await this.model.destroy({
                where: { id },
            })
            if(deleted === 0){
                throw new Error(`${this.model.name} with id ${id} not found`);
            }
            return deleted;
        }catch(error){
            console.error("Error deleting data: ", error);
            throw error;

        }
    }
}

export default BaseService;