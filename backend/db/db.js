import mongoose from "mongoose";
const DB_name="E_comm_DB";   


const ConnectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_name}`)
        console.log(`Database connected to ${connectionInstance.connection.name}`);
        
        
    } catch (error) {
        console.log("DataBase connection error ",error);
        process.exit(1);
        
        
    }
}

export default ConnectDB;