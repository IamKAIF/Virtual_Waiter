import express from "express";
import multer from "multer";
import { addItem, addItemFunc, editItemFunc, editMenuFunc, homeFunc, ordersFunc, statusFunc,cartFunc, updateCart, update_Item } from "../controllers/home.js";
// import { updateItem } from "../controllers/items.js";
const router = express.Router()

const storage = multer.memoryStorage();

const upload = multer({storage}).single("file")

router.get("/",homeFunc)
router.get("/cart",cartFunc)
router.post("/update-cart",updateCart)
router.get("/orders",ordersFunc)
router.get("/add",addItemFunc)
router.get("/editMenu",editMenuFunc)
router.get("/status",statusFunc)
router.post("/add",upload, addItem)
router.route("/:id").get(editItemFunc).post(upload,update_Item)
    


export default router;







