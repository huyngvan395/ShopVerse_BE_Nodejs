import BaseService from "./BaseService.js";
import { Address } from "../models/index.js";

class AddressService extends BaseService {
    constructor() {
        super(Address);
    }

    async getAllAddresses(userId) {
        try {
            const addresses = await this.findAll({
                where: {
                    userId: userId,
                },
            });
            return addresses;
        } catch (error) {
            console.log("Error fetching addresses(AddressService): ", error);
            throw error;
        }
    }

    async getAddressById(addressId) {
        try {
            const address = await this.findById(addressId);
            return address;
        } catch (error) {
            console.log("Error fetching address by id(AddressService): ", error);
            throw error;
        }
    }

    async getDefaultAddress(userId) {
        try {
            const address = await this.findOne({
                userId: userId,
                isDefault: true,
            });
            return address;
        } catch (error) {
            console.log("Error fetching default address(AddressService): ", error);
            throw error;
        }
    }

    async createAddress(userId, addressData) {
        try {
            const address = await this.create({
                userId,
                ...addressData,
            });
            return address;
        } catch (error) {
            console.log("Error creating address(AddressService): ", error);
            throw error;
        }
    }

    async removeAddress(addressId) {
        try {
            const address = await this.findById(addressId);
            if (!address) {
                throw new Error("Address not found");
            }
            await address.destroy();
            return address;
        } catch (error) {
            console.log("Error deleting address(AddressService): ", error);
            throw error;
        }
    }

    async updateSelectedAddress(userId, addressId) {
        try {
            const address = await this.findById(addressId);
            if (!address) {
                throw new Error("Address not found");
            }
            if (address.isDefault) {
                await this.update(addressId, {
                    isDefault: false,
                });
            } else {
                await Address.update(
                    { isDefault: false }, // dữ liệu cần cập nhật
                    {
                        where: { userId: userId }, // điều kiện để cập nhật nhiều rows
                    }
                );

                await this.update(addressId, {
                    isDefault: true,
                });
            }
            return address;
        } catch (error) {
            console.log("Error updating selected address(AddressService): ", error);
            throw error;
        }
    }
}

export default new AddressService();   