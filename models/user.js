import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        required:true,
        type:String,
        select:false,
    },
    role:{
        type:String,
        default:"customer"
    },

    createdAt:{
        type:Date,
        default:Date.now,
    },
})

export const User = mongoose.model("User",schema);
