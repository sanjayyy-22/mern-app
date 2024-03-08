import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            password:true
        },
        savedRecipes:[{
            type:mongoose.Schema.ObjectId,
            ref:"recipes",
        }]
    }
)


export const userModel = mongoose.model("users",userSchema);