import mongoose from "mongoose";
const Schema = mongoose.Schema

const itemSchema = new Schema({

name :{
    type:String ,
    required:true
},
description :{
    type:String ,
    required:true
},
price : {
    type:Number ,
    required:true
},
category : {
    type:String ,
    required:true
},
image :{
    url : {type :String ,required:true, default:""},
    filename:{type :String,required:true, default:"jewellery"}
},


})

const Item = mongoose.model("Item" , itemSchema)
export default Item