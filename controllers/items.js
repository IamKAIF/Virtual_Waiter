import errorHandler from "../middlewares/error.js";
import {Items} from "../models/items.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from 'cloudinary';


export const newItem = async(req,res,next)=>{

    try {
        const {name, description, price, category, foodType, rating} =req.body;
        const file= req.file;
        const imageUri= getDataUri(file)
        const mycloud= await cloudinary.v2.uploader.upload(imageUri.content)

    await Items.create({
        name,description,price,
        image:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        },
        category,foodType,rating, adminId:req.user
    })
    res.json({
        success:true,
        message:"Item Added Successfully"
    })
    } 
    catch (error) {
      next(error)  
    }
}
export const getMyItem= async(req,res,next)=>{
    try {
    const items = await Items.find();
    res.json({
        success:true,
        items
    })
    } catch (error) {
        next(error)
    }
}
export const updateItem=async(req, res, next)=>{
    try {
        const item = await Items.findById(req.params.id);
        const {name, description, price, category, foodType, rating} =req.body;
        const file= req.file;
        
        if(!item) return next(new errorHandler("Invalid Id",404))
        if(req.file){
            const imageUri= getDataUri(file)
            const mycloud= await cloudinary.v2.uploader.upload(imageUri.content)
            var updateFunc={image:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            },name, description, price, category, foodType, rating}
        }
        else{
            var updateFunc={name, description, price, category, foodType, rating}
        }
        
        await Items.updateOne({_id:item._id},updateFunc,{new: true})

        res.status(200).json({
            success:true,
            message:"Item Updated!"
        })

    } catch (error) {
        next(error)
    }
}
export const dltItem= async(req,res,next)=>{
    try {
        const item= await Items.findById(req.params.id);
    // if(!Order){
    //     return res.status(404).json({
    //         success:false,
    //         message:"Invalid Id"
    //     })
    // }
    if(!item) return next(new errorHandler("Invalid Id",404));
    item.deleteOne();
    res.status(200).json({
        success:true,
        message:"Item Deleted!"
    })
    } catch (error) {
        next(error)
    }
}


