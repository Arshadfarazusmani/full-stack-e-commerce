import dotenv from "dotenv";
dotenv.config({
    path:".env"
})
import app from "./app.js";
import ConnectDB from "./db/db.js"

ConnectDB().then(
    ()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`server is running on port : ${process.env.PORT}`);
            
        })
    }
).catch((err)=>{
    console.log("Server Error",err);
})