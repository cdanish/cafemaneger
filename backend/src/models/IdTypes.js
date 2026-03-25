import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const idTypeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"0"
    }


},{timestamps:true});

idTypeSchema.plugin(aggregatePaginate);

const idTypeModel = mongoose.models.idtype || mongoose.model("idType",idTypeSchema);

export default idTypeModel;
