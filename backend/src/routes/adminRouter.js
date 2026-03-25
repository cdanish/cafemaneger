
import Express  from "express";
import { tokenDecode } from "../config/DecodeJson.js";
import { adminlogin, adminlogout, createAdminUser, getUserDetails, updateAdmin, updatePassword } from "../controller/adminController.js";
import { addComputer, deleteComputer, getallcomputer, getsinglecomputer, updateComputer } from "../controller/computerController.js";
import { addId, deleteIdType, getallIdTypes, getsingleid, updateId } from "../controller/IdTypeController.js";
import { addUser, deleteuser, getalluser, getIdComputer, getSingleUser, updateUser } from "../controller/userController.js";



const router = Express.Router();

//admin
router.post("/createAdmin",createAdminUser);
router.post("/adminlogin",adminlogin);
router.get("/adminlogout",adminlogout);

//getuser
router.get("/admindetails",tokenDecode,getUserDetails);
router.post("/adminupdate",tokenDecode,updateAdmin);
router.post("/adminupdatepass",tokenDecode,updatePassword)


//computers
router.post("/addcomputer",tokenDecode,addComputer);
router.post("/updatecomputer/:id",tokenDecode,updateComputer);
router.get("/singlecomputer/:id",tokenDecode,getsinglecomputer);
router.get("/deletecomputer/:id",tokenDecode,deleteComputer);
router.get("/getallcomputers",tokenDecode,getallcomputer);


//idTypes
router.post("/addid",tokenDecode,addId);
router.post("/updateId/:id",tokenDecode,updateId);
router.get("/getsingleid/:id",tokenDecode,getsingleid);
router.delete("/deleteId/:id",tokenDecode,deleteIdType);
router.get("/getallIds",tokenDecode,getallIdTypes);



//user
router.post("/adduser",tokenDecode,addUser);
router.get("/getsinleUser/:id",tokenDecode,getSingleUser);
router.get("/getallusers",tokenDecode,getalluser);
router.delete("/delteuser/:id",tokenDecode,deleteuser);
router.post("/updateuser/:id",tokenDecode,updateUser);
router.get("/getidcomputer",tokenDecode,getIdComputer);


export default router
