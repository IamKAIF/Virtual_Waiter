import mongoose from "mongoose";

export const mongoDB=()=>{
    mongoose.connect(process.env.Mongo_URI,{
    dbname:"backendapi"
}).then(()=>{
    console.log("Database connected")})
    .catch((e)=>console.log(e));
}

