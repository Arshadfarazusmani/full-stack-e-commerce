import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index:true
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    refreshToken:{
            type: String,
        },

  },
  { timestamps: true }
);
// pre : "pre hook" most commonly applies to Mongoose, allowing you to run functions before a document is saved to or removed from the database. Pre middleware functions are executed one after another, when each middleware calls next.

userSchema.pre("save", async function(next){
            if(this.isModified("password")){
                this.password = await bcrypt.hash(this.password, 10);
                return next();
            }
            return next();

           });

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generate_Access_Token=  function () {
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username

        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            "expiresIn":process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRY
        }
    )

    
    
}
userSchema.methods.generate_Refresh_Token=  function () {

     return jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            "expiresIn":process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRY
        }
    )

    
}




export const User = mongoose.model("User", userSchema);

