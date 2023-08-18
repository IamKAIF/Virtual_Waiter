import express from "express";
import multer from "multer";
import { dltItem, getMyItem, newItem, updateItem } from "../controllers/items.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

// const Storage=multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+file.originalname);
//     }
// })
const storage = multer.memoryStorage();

export const upload = multer({storage}).single("file")

router.post("/new", isAuthenticated,upload, newItem,);
router.get("/my", isAuthenticated, getMyItem);
router.route("/:id")
.put(isAuthenticated,updateItem)
.delete(isAuthenticated,dltItem)

export default router;