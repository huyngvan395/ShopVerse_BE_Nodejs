import UserService from '../services/UserService.js';
import { validationResult } from 'express-validator';

class UserController {
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array(),
                });
            }

            let avatarUrl = null;

            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                avatarUrl = `${baseUrl}/assets/images/user/${req.file.filename}`;
            }

            const userData = {
                ...req.body,
                avatarUrl
            }

            const user = await UserService.register(userData);
            res.status(201).json({
                message: "User registered successfully",
                data: user,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                const firstError = errors.array()[0].msg;
                console.log(firstError);
                return res.status(400).json({ msg: firstError });
            }

            const { email, password } = req.body;
            const result = await UserService.login(email, password);
            if (result.error) {
                return res.json({
                    msg: result.error,
                })
            }
            res.json(result);
        } catch (error) {
            res.status(401).json({ msg: "Lỗi đăng nhập" })
        }
    }

    async getProfile(req, res) {
        try {
            const user = await UserService.getUserProfile(req.user.id);
            res.json({ user });
        } catch (error) {
            res.status(404).json({
                message: error.message,
            })
        }
    }

    async updateProfile(req, res) {
        try {
            const errors = validationResult(req);
            console.log(req.body);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }

            // Gán avatarUrl nếu có file upload
            let avatarUrl = null;
            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                avatarUrl = `${baseUrl}/assets/images/user/${req.file.filename}`;
            }

            // Gộp thông tin update
            const updatedData = {
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                ...(avatarUrl && { avatar: avatarUrl }) // chỉ thêm nếu có file
            };

            // Gọi service để update
            const user = await UserService.updateUserProfile(req.params.id, updatedData);

            res.json(user);
        } catch (error) {
            console.error("Error updating profile: ", error);
            res.status(400).json({
                message: error.message,
            });
        }
    }


    async getFollowers(req, res) {
        try {
            const followers = await UserService.getFollowers(req.params.userId);
            res.json({ followers });
        } catch (error) {
            res.status(404).json({
                message: error.message,
            })
        }
    }

    async getFollowing(req, res) {
        try {
            const following = await UserService.getFollowing(req.params.userId);
            res.json({ following });
        } catch (error) {
            res.status(404).json({
                message: error.message,
            })
        }
    }
}

export default new UserController();