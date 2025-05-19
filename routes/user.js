import express from 'express';
import UserController from '../controllers/UserController.js';
import userValidators from '../utils/validators.js';
import auth from '../middlewares/auth.js';
import { User } from '../models/index.js';
import upload from '../middlewares/upload.js';

const router= express.Router();

router.post("/profile", UserController.getProfile);
router.post("/:id/update", upload.single("image"), userValidators.updateProfile, UserController.updateProfile);
router.get("/:userId/followers", UserController.getFollowers);
router.get("/:userId/following", UserController.getFollowing);

export default router;