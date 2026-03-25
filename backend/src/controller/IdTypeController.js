import idTypeModel from "../models/IdTypes.js";


//addid
export const addId =  async(req ,res )   =>{
    try{

        const {name,status} = req.body;

        if(!name){
             throw new Error("please add id name details")
        }

        const addId = new idTypeModel({name,status});

        await addId.save();

        return res.status(200).send({
            addId,
            error: false,
            success: true,
            message: "added Id Successfully"
        })

    }catch(error ){
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//editid
export const updateId = async(req ,res )   =>{
    try{

        const {id} = req.params;
        const {name,status} = req.body;

        const updateId = await idTypeModel.findByIdAndUpdate(id,{name,status},{new:true});

        return res.status(200).send({
            updateId,
            error: false,
            success: true,
            message: "updated Id successfully"
        });

        

    }catch(error ){
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


//getsingid
export const getsingleid = async(req ,res )   =>{
    try{

        const {id} = req.params;

        const singleId = await idTypeModel.findById(id);

        return res.status(200).send({
            singleId,
            error: false,
            success: true,
            message: "updated Id successfully"
        });



    }catch(error ){
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//deleteid
export const deleteIdType = async(req ,res )   =>{
    try{

        const {id} = req.params;

        await idTypeModel.findByIdAndDelete(id);

        return res.status(200).send({
           
            error: false,
            success: true,
            message: "Deleted Id Type Id successfully"
        });

    }catch(error ){
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

//getallidtypes
export const getallIdTypes = async(req ,res )   =>{
    try{


        const {page,limit,statusNumber} = req.query;
        //console.log(statusNumber);

        const options = {
            page:parseInt(page),
            limit:parseInt(limit)
        }

        const pipeline =[];

        if(statusNumber !== undefined && statusNumber !== "all"){
            pipeline.push({
                $match:{status :statusNumber}
            })
            
        }

        const allIdTypes = await (idTypeModel ).aggregatePaginate(
            idTypeModel.aggregate(pipeline),
            options
        );


        return res.status(200).send({
                allIdTypes,
                error: false,
                success: true,
                message: "All ID Proofs"
        });



    }catch(error ){
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}