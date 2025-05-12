import express from 'express';
import UserController from '../controllers/UserController.js';
import userValidators from '../utils/validators.js';
import auth from '../middlewares/auth.js';
import { User } from '../models/index.js';

const router= express.Router();

router.post("/profile", auth, UserController.getProfile);
router.put("/profile",auth, userValidators.updateProfile, UserController.updateProfile);
router.get("/:userId/followers", UserController.getFollowers);
router.get("/:userId/following", UserController.getFollowing);

export default router;