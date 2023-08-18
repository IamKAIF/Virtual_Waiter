import { User } from "../models/user.js";
import jwt from "jsonwebtoken"


export const isAuthenticated= async (req, res, next)=>{

    const {token}= req.cookies;

    if(!token){
        return res.status(404).json({
            status:false,
            message:"Login First"
        });
    }

    const decoded = jwt.verify(token,process.env.JWT_TOKEN)

    req.user = await User.findById(decoded._id);
    next();
}