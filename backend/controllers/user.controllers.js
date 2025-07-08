import asyncHandler from "../utils/async_handler.js";
import api_error from "../utils/api_error.js";
import api_response from "../utils/api_response.js";
import { User } from "../models/user.models.js";

const registerUser=asyncHandler(async(req ,res)=>{

    // get user details from frontend 
    // validation
    // check if user already exist 
    // create user object - create entry in db 
    // remove password and refresh token field from response 
    // 
    

const {username,email,password}=req.body
   
if(!username || !email || !password){
    throw new api_error(400,"Please fill all the fields");}

const userExists = await User.findOne({ email });

if (userExists) {
    throw new api_error(409,"User already exists")
    
}
    
const user=await User.create({
    username: username.toLowerCase(),
    email,
    password,
    
});

const createduser =await User.findById(user._id).select("-password -refreshToken");

if(!createduser){
    throw new api_error(500,"User creation failed");
}


res.status(201).json(new api_response(200,"User created successfully",createduser));


    
});

export {registerUser}