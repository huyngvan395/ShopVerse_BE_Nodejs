import AddressService from '../services/AddressService.js';
class AddressController{
    async getAllAddresses(req, res) {
        try {
            const userId = req.params.id;
            const addresses = await AddressService.getAllAddresses(userId);
            res.json(addresses);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    async getAddress(req, res) {
        try {
            const addressId = req.params.addressId;
            const address = await AddressService.getAddressById(addressId);
            res.json(address);
        } catch (error) {
            res.status(404).json({
                message: error.message,
            });
        }
    }

    async getDefaultAddress(req, res) {
        try {
            const userId = parseInt(req.params.id);
            console.log("User ID: ", userId);
            const address = await AddressService.getDefaultAddress(userId);
            if(!address){
                return null
            }
            res.json(address);
        } catch (error) {
            res.status(404).json({
                message: error.message,
            });
        }
    }

    async addAddress(req, res) {
        try {
            const userId = req.params.id;
            const addressData = req.body;
            const address = await AddressService.createAddress(userId, addressData);
            res.status(201).json(address);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    async removeAddress(req, res) {
        try {
            const addressId = req.params.addressId;
            await AddressService.removeAddress(addressId);
            res.status(204).json(true);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    async updateSelectedAddress(req, res) {
        try {
            console.log(">>> updateSelectedAddress called");
            const userId = req.params.id;
            const addressId = req.params.addressId;
            const address = await AddressService.updateSelectedAddress(userId, addressId);
            res.json(address);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

export default new AddressController();