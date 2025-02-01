import mongoose from "mongoose";
const Schema = mongoose.Schema;


const advertiseSchema = new Schema({
    image:{
        url :{type:String , default:""},
        filename :{ type:String , default:"advertisement" }
    }
})

const LuckyDraw = mongoose.model("LuckyDraw",advertiseSchema)

export default LuckyDraw;