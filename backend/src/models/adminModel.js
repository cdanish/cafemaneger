import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const adminSchema = new mongoose.Schema({
    adminname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    adminemail:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    com_name:{
        type:String,
        default:"Cyber Cafe Management"
    }

},{
    timestamps:true
});

adminSchema.plugin(aggregatePaginate);

const adminModel = mongoose.models.admin || mongoose.model("admin",adminSchema);

export default adminModel

