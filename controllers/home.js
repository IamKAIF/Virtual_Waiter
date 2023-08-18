import { Items } from "../models/items.js";
import cloudinary from 'cloudinary';
import getDataUri from "../utils/dataUri.js";
import errorHandler from "../middlewares/error.js";

export const homeFunc= async(req,res,next)=>{
    try{
        const items= await Items.find();
        const snacks = await Items.find({ category: "Snacks" });
        const drinks = await Items.find({ category: "Drinks" });
        const meals = await Items.find({ category: "Meals" });
        const desserts = await Items.find({ category: "Desserts" });
        const starters = await Items.find({ category: "Starters" });
        res.render("01_home", {items,snacks,drinks,meals,desserts,starters} )
    } catch (error) {
        next(error)
    }
}
  export const cartFunc=(req,res,next)=>{
    try {
        const cartItems = req.session.cart;
        res.render("02_cart", {cartItems})
    } catch (error) {
        next(error)
    }
}

export const updateCart=(req,res,next)=>{
    try {
        if(!req.session.cart){
            req.session.cart={
                items:{},
                totalQty:0,
                totalPrice:0
            }
       }
     
       let cart=req.session.cart
    //    console.log(req.body)
         //check if item does not exist in cart
         if(!cart.items[req.body._id]){ 
                cart.items[req.body._id]={
                    item:req.body,
                    qty:1
                }
                cart.totalQty=cart.totalQty+1;
                cart.totalPrice=cart.totalPrice+req.body.price
         }else{
            cart.items[req.body._id].qty= cart.items[req.body._id].qty+1
            cart.totalQty=cart.totalQty+1
            cart.totalPrice=cart.totalPrice+req.body.price
        }
 
        
        return res.json({totalQty:req.session.cart.totalQty,totalItem:req.session.cart})
        
        // res.render("02_cart", {cart})
        
    } catch (error) {
        next(error)
    }            
}


export const statusFunc=async(req,res,next)=>{
    try {
        const items = await Items.find();
        res.render("03_Status",{items})
    } catch (error) {
        next(error)
    }

}
export const ordersFunc=(req,res,next)=>{
    try {
        res.render("A01_orders")
    } catch (error) {
        next(error)
    }
}
export const addItemFunc=(req,res,next)=>{
    try {
        res.render("A02_addItem")
    } catch (error) {
        next(error)
    }
}
export const editMenuFunc=async(req,res,next)=>{
    try {
        const items= await Items.find();
        const snacks = await Items.find({ category: "Snacks" });
        const drinks = await Items.find({ category: "Drinks" });
        const meals = await Items.find({ category: "Meals" });
        const desserts = await Items.find({ category: "Desserts" });
        const starters = await Items.find({ category: "Starters" });
        res.render("A03_editMenu", {items,snacks,drinks,meals,desserts,starters} )
    } catch (error) {
        next(error)
    }
}
export const editItemFunc=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const item=await Items.findById(id);
        res.render("A04_editItem",{item})
    } catch (error) {
        next(error)
    }
}
export const update_Item=async(req, res, next)=>{
    try {
        const item = await Items.findById(req.params.id);
        const {name, description, price, category, foodType, rating} =req.body;
        const file= req.file;
        
        if(!item) return next(new errorHandler("Invalid Id",404))
        if(!req.file){
            var updateFunc={name, description, price, category, foodType, rating}
        }
        else{
            const imageUri= getDataUri(file)
            const mycloud= await cloudinary.v2.uploader.upload(imageUri.content)
            var updateFunc={image:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            },name, description, price, category, foodType, rating}
        }
        
        await Items.updateMany({ _id: item._id }, { $set: updateFunc },{new: true});
        res.redirect('/editMenu')
        // console.log(req.body)
        // res.status(200).json({
        //     success:true,
        //     message:"Item Updated!"
        // })

    } catch (error) {
        next(error)
    }
}
export const addItem = async(req,res,next)=>{

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
    res.redirect('editMenu')
    // res.json({
    //     success:true,
    //     message:"Item Added Successfully"
    // })
    } 
    catch (error) {
      next(error)  
    }
}