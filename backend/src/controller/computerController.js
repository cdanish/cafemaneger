import computerModel from "../models/coputerMode.js";


//create computerlist
export const addComputer = async(req ,res )  =>{
    try{
        const {computerName,systemLocation} = req.body;

        if(!computerName || !systemLocation){
            return res.status(400).send({
                error: true,
                success: false,
                message: "please fill computername or system location"
            });
        }

        const newComputer = new computerModel({computerName,systemLocation});

        await newComputer.save();

        return res.status(200).send({
            newComputer,
                error: false,
                success: true,
                message: "Computer added successfully"
        });

    }catch(error ){
         return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//updatecomputer
export const updateComputer = async(req ,res )  =>{
    try{
        
        const {id} = req.params;
        const {computerName,systemLocation,status} = req.body;

        if(!computerName || !systemLocation || !status){
            return res.status(400).send({
                error: true,
                success: false,
                message: "please fill all details"
            });
        }

        

        const updateComputer = await computerModel.findByIdAndUpdate(id,{computerName,systemLocation,status},{new:true});

        return res.status(200).send({
                updateComputer,
                error: false,
                success: true,
                message: "Computer added successfully"
        });

    }catch(error ){
         return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//getsingleComputer
export const getsinglecomputer = async(req ,res )  =>{
    try{

        const {id} = req.params;

        const getsinglecomputer = await computerModel.findById(id);

        return res.status(200).send({
                getsinglecomputer,
                error: false,
                success: true,
                message: "view Single Computer"
        });


    }catch(error ){
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//deletecomputer
export const deleteComputer = async(req ,res )  =>{
    try{

        const {id} = req.params;

        await computerModel.findByIdAndDelete(id);

        return res.status(200).send({
                
                error: false,
                success: true,
                message: "deleted the selected computer"
        });

    }catch(error ){
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//getall computer
export const getallcomputer = async(req ,res )  =>{
    try{

        const {page,limit,statusNumber} = req.query;

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

        const allcomputers = await (computerModel).aggregatePaginate(
            computerModel.aggregate(pipeline),
            options
        )

        // const computers  = [{}];
        // const allcomputer = await (computerModel  ).aggregatePaginate(computers,options);

        return res.status(200).send({
                allcomputers,
                error: false,
                success: true,
                message: "All Computers"
        });


    }catch(error ){
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}