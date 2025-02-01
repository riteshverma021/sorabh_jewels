
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import { dbconnected } from "../database/db.js"
import itemRouter from "../route/itemRouter.js"
import mainRouter from "../route/mainPage.js"
import luckyDraw from "../route/luckyDraw.js"
const app = express()
const port = 1002



//middlewares 
const allowedOrigins = [process.env.VITE_FRONTEN_URL];
app.use(cors({
    origin:allowedOrigins ,

    credentials:true
}))

//for parsing the data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

//db
dbconnected()

//routes....
app.use("/items",itemRouter)
app.use("/sourabhJewellers",mainRouter)
app.use("/luckydraw",luckyDraw)






app.listen(port , ()=>{
    console.log("listening on port 1002.........");
    
})






