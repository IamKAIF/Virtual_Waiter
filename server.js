import { app } from "./app.js";
import { mongoDB } from "./data/database.js";
import cloudinary from 'cloudinary';
import {Server} from 'socket.io'
mongoDB();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
})
const server=app.listen(process.env.PORT,()=>{
    console.log("Server is Working!!")
})
const io = new Server(server);