import express from 'express';
import AddressController from '../controllers/AddressController.js';

const router = express.Router();

router.post('/:id/add', AddressController.addAddress);
router.get('/addresses/:id', AddressController.getAllAddresses);
router.get("/:id/default", AddressController.getDefaultAddress);
router.post("/:addressId/remove", AddressController.removeAddress);
router.post("/:id/:addressId", AddressController.updateSelectedAddress);

export default router;

