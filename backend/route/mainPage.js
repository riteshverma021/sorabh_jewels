import express from "express"
import mainController from "../controller/mainController.js"
const router = express.Router()



router.get("/items",mainController.displayMain)







export default router