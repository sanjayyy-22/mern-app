import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {userModel} from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const route=express.Router();


route.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (user) {
            return res.status(401).json({ message: "User already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User registered successfully!" });
    } catch (err) {
        return res.status(503).json({ message: err.message });
    }
})

route.post("/login",async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user = await userModel.findOne({username});
        if(!user){
            res.status(404).json({message:"User not registered!"});
        }

        const isPassValid=await bcrypt.compare(password,user.password);
        if(!isPassValid){
            res.status(401).json({message:"Username or password is incorrect"});
        }

        const token=jwt.sign({id:user._id},'secret');
        res.status(200).json({userId:user._id,token});

    }catch(err){
        res.status(500).json({message:err.message});
    }

})










export {route as userRoute};