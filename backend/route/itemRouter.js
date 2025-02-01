import express from "express";
const router = express.Router();
import itemController from "../controller/itemController.js";
import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Set your upload folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Add a unique timestamp to filenames
    },
  });
  
  const upload = multer({ storage });



//to show data on frontend
router.get("/main",itemController.displayItem)
router.post("/addNew",upload.single("image"),itemController.addNew)

router.get("/:id/edit" , itemController.editData)
router.put("/:id", upload.single("image"),itemController.updatedData)
router.delete("/:id" , itemController.deleteItem)












export default router






