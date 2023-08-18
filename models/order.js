import mongoose from "mongoose";

const orderSchema= new mongoose.Schema({
    tableNo:{ type:String, unique:true, required:true},
    items:{ type:Object, required:true,},
    paymentType:{type:String, default:'COD'},
    status:{type:String, default:'order_placed'},
    customerId:{ type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}

},
{timestamps:true})

export const Order =mongoose.model("order",orderSchema);