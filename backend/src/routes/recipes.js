import { recipeModel } from "../models/recipes.js";
import express from 'express';
import mongoose  from "mongoose";
import { userModel } from "../models/userModel.js";

const route=express.Router();

route.get("/", async(req,res)=>{
    try{
        const recipe=await recipeModel.find({});
        res.status(200).json(recipe);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})


route.post("/", async(req,res)=>{
    const newRecipe=new recipeModel(req.body);
    try{
        const recipe=await newRecipe.save();
        res.status(200).json(newRecipe);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

route.put("/", async(req,res)=>{
    
    try{
        const recipe=await recipeModel.findById(req.body.recipeId);
        const user=await userModel.findById(req.body.userId);
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(200).json({savedRecipes:user.savedRecipes});

    }catch(err){
        res.status(500).json({message:err.message});
    }
})

route.get("/saved/ids",async(req,res)=>{
    try{
        const user=await userModel.findById(req.body.userId);
        res.status(200).json({savedRecipes:user?.savedRecipes});

    }catch(err){
        res.status(500).json({message:err.message});
    }
})

route.get("/saved",async(req,res)=>{
    try{
        const user=await userModel.findById(req.body.userId);
        const savedRecipe=await recipeModel.find({
            _id:{$in:user.savedRecipes},
        });
        res.status(200).json({savedRecipes:savedRecipe});

    }catch(err){
        res.status(500).json({message:err.message});
    }
})


export {route as recipeRouter };


