import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const computerSchema = new mongoose.Schema({

    computerName:{
        type:String,
        required:true
    },
    systemLocation:{
        type:String,
        required:true
    },
    idAdress:{
       type:String, 
    },
    status:{
       type:String,
       default:"0",
    }
}, {timestamps:true});

computerSchema.plugin(aggregatePaginate);

const computerModel = mongoose.models.computer || mongoose.model("computer",computerSchema);

export default computerModel