import errorHandler from "../middlewares/error.js";
import {Order} from "../models/order.js";


export const newOrder = async(req,res,next)=>{

    try {
        const {tableNo, items, paymentType} =req.body;

    await Order.create({
        tableNo, items, paymentType, customerId:req.user
    })
    res.json({
        success:true,
        message:"Order created Successfully!!"
    })
    } 
    catch (error) {
      next(error)  
    }
}
export const getMyOrder= async(req,res,error)=>{
    
    try {
        const userid = req.user._id
       
    const Orders = await Order.find({user:userid});
    res.json({
        success:true,
        Orders
    })
    } catch (error) {
        next(error)
    }
}
export const updateOrder=async(req, res, next)=>{
    try {
        const order = await Order.findById(req.params.id);
        console.log(order)

    if(!order) return next(new errorHandler("Invalid Id",404))
    order.status =req.body.status;
    await order.save();

    res.status(200).json({
        success:true,
        message:"Order Updated!"
    }) 

    } catch (error) {
        next(error)
    }
}
export const dltOrder= async(req,res,next)=>{
    try {
        const order= await Order.findById(req.params.id);
    // if(!Order){
    //     return res.status(404).json({
    //         success:false,
    //         message:"Invalid Id"
    //     })
    // }
    if(!order) return next(new errorHandler("Invalid Id",404));
    order.deleteOne();
    res.status(200).json({
        success:true,
        message:"Order Deleted!"
    })
    } catch (error) {
        next(error)
    }
}


