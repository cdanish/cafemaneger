import adminModel from "../models/adminModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


//create adminuser //singup
export const createAdminUser = async (req, res) => {
    try {

        const { adminname, username, adminemail, password } = req.body;

        if (!adminname || !username || !adminemail || !password) {
            throw new Error("please fill all details")
        }

        let user = await adminModel.findOne({ adminemail });

        // console.log(user);
        if (user) {
            return res.status(300).send({
                error: false,
                success: true,
                message: "This user already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser = new adminModel({ adminname, username, adminemail, password: hashpassword });

        await newUser.save();
        return res.status(200).send({
            newUser,
            error: false,
            success: true,
            message: "This user is already exists"
        })

    } catch (error ) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

///admin login


export const adminlogin = async (req , res )  => {
    try {

        const { username, password } = req.body;
        //console.log(username, password);

        if (!username || !password) {
            throw new Error("please fill all details");
        }

        let user = await adminModel.findOne({ username });

        if (!user) {
            return res.status(200).send({
                error: true,
                success: false,
                message: "This user does not exists",
            });
        }

        const checkpassword = await bcrypt.compare(password, user?.password);

        if (!checkpassword) {

            return res.status(200).send({
                error: true,
                success: false,
                message: "please check password",
            });

        }

        let token = jwt.sign(
            {
                user: user.adminemail,
                name: user.username,
                id: user._id
            },
            process.env.JWT_KEY || "secrect",
            { expiresIn: '3h' }
        )

        const tokenOption = {
            httpOnly: true,
            secure: true
        }

        res.cookie("token", token, tokenOption);

        return res.status(200).send({
            data: token,
            error: false,
            success: true,
            message: "Login Successfully"
        })


    } catch (error ) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const adminlogout = async (req , res )  => {
    try {


        res.clearCookie("token");
        return res.status(200).send({
            data: [],
            error: false,
            success: true,
            message: "logout Successfully"
        })


    } catch (error ) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


export const getUserDetails = async (req , res )  => {
    try {

        const { id } = req;

        const getuser = await adminModel.findById(id);

        return res.status(200).send({
            data: getuser,
            error: false,
            success: true,
            message: "admin login details"
        })

    } catch (error ) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateAdmin = async (req , res )  => {
    try {

        const { id } = req;

        const { adminname, username, adminemail, com_name } = req.body;

        const updateduser = await adminModel.findByIdAndUpdate(id, {
            adminname, username, adminemail, com_name
        }, { new: true })

        return res.status(200).send({
            data: updateduser,
            error: false,
            success: true,
            message: "admin details updated"
        })



    } catch (error ) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
export const updatePassword = async (req , res )  => {
    try {

        const { id } = req;

        const { password, newpassword } = req.body;

        const getcheckpassword = await adminModel.findById(id);

        const checkPass = await bcrypt.compare(password, getcheckpassword?.password);

        if (!checkPass) {
            return res.status(400).send({
                error: false,
                success: true,
                message: "old password not matching"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(newpassword, salt);


        await adminModel.findByIdAndUpdate(id, { password: hashpassword }, { new: true });

        return res.status(200).send({

            error: false,
            success: true,
            message: "password updated successfully"
        })
        return res.status(200).send({
            data: "",
            error: false,
            success: true,
            message: "admin login details"
        })



    } catch (error ) {
        return res.status(500).send({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}