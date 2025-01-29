import mongoose from "mongoose";

const candleSchema= new mongoose.Schema(
    {
     
        image:{
            secure_url:{type:String,required:true},            
            public_id:{type:String,required:true},
            asset_id:{type:String,required:true},
       
        }
    },
    {timestamps:true}
)

const Candle=mongoose.model("candle",candleSchema)
export default Candle