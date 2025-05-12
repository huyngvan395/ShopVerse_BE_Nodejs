import jwt from "jsonwebtoken";
import {User} from "../models/index.js";

const auth = async (req, res, next) => {
    try{
        const authHeader = req.header("Authorization");

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message: "Authorization token is required"});
        }

        const token = authHeader.replace("Bearer", "")

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id, {
            attributes: {
                exclude: ["password"],
            },
        })

        if(!user){
            throw new Error("User not found ");
        }

        req.user = user;
        next();
    } catch(error){ 
        res.status(401).json({message: "Please authenticate"});
    }
}

export default auth;