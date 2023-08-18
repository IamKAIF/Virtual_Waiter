import express from "express";
import {config} from "dotenv";
import userRouter from './routes/user.js';
import orderRouter from './routes/order.js';
import itemsRouter from './routes/items.js';
import homeRouter from './routes/home.js';
import cookieParser from "cookie-parser";
import {errorMiddleware } from "./middlewares/error.js";
import { mongoDB } from "./data/database.js";
import session from "express-session";
import {default as connectMongo}from 'connect-mongodb-session';
import path  from "path";
import mongoose from "mongoose";


const MongoStore = connectMongo(session);

export const app = express();

config({
    path: "./data/config.env"
});
const router = express.Router();
app.set("view engine","ejs");
app.use(express.static(path.join(path.resolve(),"public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})



//Session Config
let store=new MongoStore({
    uri:process.env.Mongo_URI+'/backendapi',
    mongooseConnection:mongoDB.connection,
    collection:"sessions"
})
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60},
    store:store
}))
// const sessionsCollection = mongoose.connection.collection('sessions');
// sessionsCollection.find({}, (err, data) => {
//   if (err) {
//     console.error('Failed to retrieve collection data:', err);
//     return;
//   }

//   // Process the retrieved data
//   console.log('Collection data:', data);

//   // Continue with your logic here
// });

//Using Middleware  
 
app.use(cookieParser());
app.use(homeRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/order",orderRouter);
app.use("/api/v1/items",itemsRouter);
app.use(errorMiddleware);


