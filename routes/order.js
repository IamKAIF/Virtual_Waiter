import express from "express";
import { dltOrder, getMyOrder, newOrder, updateOrder } from "../controllers/order.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()



router.post("/new", isAuthenticated, newOrder);
router.get("/my", isAuthenticated, getMyOrder);
router.route("/:id")
.put(isAuthenticated,updateOrder)
.delete(isAuthenticated,dltOrder)



export default router;