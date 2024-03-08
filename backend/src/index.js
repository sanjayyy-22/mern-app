import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userModel} from '../src/models/userModel.js';

import {userRoute} from '../src/routes/userRoutes.js';
import { recipeRouter } from './routes/recipes.js';

const app=express()

app.use(express.json());
app.use(cors());

app.use("/auth",userRoute);
app.use("/recipes",recipeRouter);

app.listen(4001,()=>{
    console.log("Server started at port 4001...");

})

mongoose.connect("mongodb+srv://21pw29:root@cluster0.mmzvcez.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Database connected!"))
.catch((err)=>console.log(err));