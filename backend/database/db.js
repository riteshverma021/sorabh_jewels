import mongoose, { mongo } from "mongoose";






 export const dbconnected = async()=>{
    await mongoose.connect("mongodb+srv://riteshvermaghd21:ritesh21@cluster0.zy1he.mongodb.net/jewel_item").then(()=>{
        console.log("connected to db")  
    })
 } 

  



