import mongoose from "mongoose";


const ConnectDB = async()=>{
    try{

        const url = process.env.MONGO_URI;
        await mongoose.connect(url);
        console.log(`connected DB`)

    }catch(error){
        console.log(error);
    }
}

export default ConnectDB