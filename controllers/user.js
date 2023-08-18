import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "./utils/features.js"
import errorHandler from "../middlewares/error.js"



export const getMyProfile= (req,res)=>{
    
     res.status(200).json({
         success:true,
         user:req.user
     });

}
export const login=async (req,res,next)=>{

    try {
        const {email, password}= req.body;

    const user= await User.findOne({email}).select("+password")

    if(!user) return next(new errorHandler("Invalid Email or Password",400))

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return next(new errorHandler("Invalid Email or Password",400))
    

    sendCookie(res,user,`Welcome Back, ${user.name}`,201)

    } catch (error) {
        next(error)        
    }
}
export const register=async (req,res,next)=>{
    
    try {
        const {name, email, password}=req.body;
    let user = await User.findOne({email});
    
    if(user) return next(new errorHandler("User Already Exist",400))

    const hashedPasssword= await bcrypt.hash(password,10)
     user = await User.create({name,email,password:hashedPasssword})

     sendCookie(res,user,"Registered Successfully",201)
    } catch (error) {
        next(error)
    }
    
}

export const logout= (req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now())
    }).json({
        success:true,
    })
}


















// export const homeFunc=(req,res)=>{
//     res.send("Hello my code")
// }

// export const specialFunc=(req,res)=>{
//     res.json({
//         success:"true",
//         message:"route before dynamic route"
//     })
// }
// export const updateUserByID=async (req,res)=>{
    //     const {id}= req.params;
//     const user = await User.findById(id);
//     res.json({
//        success:"true",
//        message:"Updated!!",
//    })
// }
// export const dltUserById=async (req,res)=>{
//     const {id}= req.params;
//     const user = await User.findById(id);
//     await user.deleteOne();
//     res.json({
//        success:"true",
//        message:"Deleted!!",
//    })
// }