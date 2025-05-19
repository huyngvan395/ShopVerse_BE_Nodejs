import {body} from "express-validator";

const userValidators = {
    register: [
        body("email").isEmail().withMessage("Email không hợp lệ"),
        body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
    ],
    login: [
        body("email").isEmail().withMessage("Email không hợp lệ"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    updateProfile: [
        body("email").isEmail().withMessage("Valid email is required"),
        body("fullName").notEmpty().withMessage("Name is required"),
        body("avatarUrl").optional().isURL().withMessage("Avatar URL must be a valid URL"),
    ]
}

export default userValidators;