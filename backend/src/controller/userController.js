import computerModel from "../models/coputerMode.js";
import idTypeModel from "../models/IdTypes.js";
import userModel from "../models/userMode.js";

//createuser
export const addUser = async (req, res) => {
    try {

        const { username, email, phone, address, computer, idProof, fees, remark, status } = req.body;

        if (!username || !phone || !computer || !idProof) {
            return res.status(400).send({
                error: true,
                success: false,
                message: "please fill all details"
            });
        }

        const newUser = new userModel({
            username,
            email,
            phone,
            address,
            computer,
            idProof,
            fees,
            remark,
            status
        });

        await newUser.save();

        await computerModel.findByIdAndUpdate(computer, { status: "1" }, { new: true });


        return res.status(200).send({
            newUser,
            error: false,
            success: true,
            message: "User added successfully"
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//updateUser
export const updateUser = async (req, res) => {
    try {

        const { outTime, status,fees,remark,computer } = req.body;
        const { id } = req.params;
        await userModel.findByIdAndUpdate(id, { outTime, status,fees,remark }, { new: true });

        if(status == 0){
             console.log(status)
            await computerModel.findByIdAndUpdate(computer,{status:0},{ new: true })
        }


        return res.status(200).send({

            error: false,
            success: true,
            message: "User updated successfully"
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//getsingeuser
export const getSingleUser = async (req, res) => {
    try {

        const { id } = req.params;

        const getSingleUser = await userModel.findById(id);
        const computerid = getSingleUser.computer;
        const idproofid = getSingleUser.idProof;
        const computerdetails = await computerModel.findById(computerid);
        const idproofdetails = await idTypeModel.findById(idproofid);

        return res.status(200).send({
            computerdetails,
            getSingleUser,
            idproofdetails,
            error: false,
            success: true,
            message: "single User Data"
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//getavaiableidandcomputers
export const getIdComputer = async(req,res)=>{
    try{

        const getAllIds = await idTypeModel.find({ status: 1 });
        const getallComputer = await computerModel.find({status: 0});
         return res.status(200).send({
            getAllIds,
            getallComputer,
            error: false,
            success: true,
            message: "all ids and computer"
        });

    }catch (error) {
        return res.status(500).send({
            
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//getalluser
export const getalluser = async (req, res) => {
    try {
        const { page, limit, statusNumber } = req.query;

        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 25;

        const options = {
            page: pageNumber,
            limit: limitNumber
        };

        const pipeline= [];

        // status

        

        
        
        pipeline.push(
            {
                $lookup: {
                    from: "computers",
                    localField: "computer",
                    foreignField: "_id",
                    as: "computer"
                }
            },
            {
                $lookup: {
                    from: "idtypes",
                    localField: "idProof",
                    foreignField: "_id",
                    as: "idProof"
                }
            },
            { $unwind: "$computer" },
            { $unwind: "$idProof" }
        );

        if (statusNumber && statusNumber !== "all") {
            //console.log(statusNumber);
            //console.log(typeof statusNumber)
            pipeline.push(
                {
                $match: { status: statusNumber } 
            }
            
        );
        }

        const allusers = await (userModel).aggregatePaginate(
            userModel.aggregate(pipeline),
            options
        );

        const activeUserCount = await userModel.countDocuments({ status: "0" });
        const totalComputers = await computerModel.countDocuments({});
        const activeComputers = await computerModel.countDocuments({ status: "0" });

        


        return res.status(200).send({
            allusers,
            activeUserCount,
            totalComputers,
            activeComputers,
            error: false,
            success: true,
            message: "All User Data"
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};


//deleteuser

export const deleteuser = async (req, res) => {
    try {

        const { id } = req.params;
        const {computer} = await userModel.findById(id);
        await computerModel.findByIdAndUpdate(computer,{status:0},{ new: true });
        await userModel.findByIdAndDelete(id);

        return res.status(200).send({

            error: false,
            success: true,
            message: "Selected User Deleted Successfuly"
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


