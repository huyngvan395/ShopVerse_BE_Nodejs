import express from 'express';
import UserController from '../controllers/UserController.js';
import userValidators from '../utils/validators.js';
import upload from '../middlewares/upload.js';

const  router = express.Router();

router.post('/register', upload.single("image"), userValidators.register, UserController.register);

router.post('/login', userValidators.login,  UserController.login);

export default router;