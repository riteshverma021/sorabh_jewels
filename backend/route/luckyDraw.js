import express from "express"
import luckydrawController from "../controller/luckydrawController.js"
const router = express.Router()

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



router.post("/scheme",upload.single("image"),luckydrawController.uploadScheme)
router.get("/getScheme",luckydrawController.getScheme)

export default router