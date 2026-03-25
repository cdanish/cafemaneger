import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema({

    entryId:{
        type:Number,
        default:Math.floor(Math.random() * 900000000) + 100000000,
        require:true
        
    },
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:false,
    },
    phone:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:false,
    },
    computer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"computer",
        require:true
    },
    idProof:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"idType",
        require:true
    },
    inTime:{
        type:String,
        default:Date.now
    },
    outTime:{
        type:String,
        default:null
    },
    fees:{
        type:String,
        require:true,
        default:"30"
    },
    remark:{
        type:String,
        require:false,
    },
    status:{
        type:String,
        require:true,
        default:"0"
    }


},{
    timestamps:true
});

userSchema.plugin(mongooseAggregatePaginate);

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;
