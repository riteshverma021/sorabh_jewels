import { get } from "mongoose";
import LuckyDraw from "../models/advertise.js";

const uploadScheme = async(req,res)=>{

    const newData = {
        image:{}
    }
    if(req.file){
        newData.image={
            url:req.file.path,
            filename:req.file.filename
        }
    }

    try {
        const addNewData = new LuckyDraw(newData)
        await addNewData.save()
        res.json({success:true , message:"lucky draw scheme added"})
    } catch (error) {
        res.json({success:false , message:"error occured"})
    }

}


const getScheme =async(req,res)=>{

    try {
        const getData = await LuckyDraw.find()
        .sort({_id:-1})
        .limit(1)
       
        
    res.json(getData[0])
    } catch (error) {
        console.log(error);
        
    }

}










export default {uploadScheme,getScheme}