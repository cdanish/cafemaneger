import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import adminRoute from "./routes/adminRouter.js";
import morgan from "morgan";
import ConnectDB from "./lib/connectDB.js";
import express from 'express'

//dot env
dotenv.config();


const myapp = express();

//port 
const port = process.env.PORT;

//middleware
myapp.use(cors(
    {
        origin:process.env.FRONTEND_URL,
        credentials: true
    }
));
myapp.use(cookieParser());
myapp.use(express.json({limit:'10mb'}));
myapp.use(express.urlencoded({limit:'10mb',extended:true}));
myapp.use(morgan('short'));


//dbconnect
ConnectDB();

//swagger
const swaggerDocument = JSON.parse(
  fs.readFileSync("./src/utils/swagger-output.json", "utf8")
);

// ✅ Swagger route
myapp.use("/api-test",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

//main routes
myapp.use('/api',adminRoute);

//testroute
myapp.get('/',(req,res)=>{
    res.send("<h1>Hello word danish chaush this is typescript project new</h1>");
});




myapp.listen(port,()=>{
    console.log(`server running typscript ${port}`);
})