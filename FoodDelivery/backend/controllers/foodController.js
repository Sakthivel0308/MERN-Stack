
import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item

const addFood = async (req,res) =>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try{
        await food.save();
        res.status(201).json({
            success: true,
            message: "Food Added",
        });
    }catch(err){
        res.status(500).json({
            message: "Failed to Add",
            error: err,
        });
    }

}

//All food list

const listFood = async (req,res) =>{
    try{
        const foods = await foodModel.find({});
        res.status(200).json({
            success: true,
            data: foods,
        });
    }catch(err){
        res.status(500).json({
            message: "Failed to Get Food List",
            error: err,
        });
    }

}

//remove food item

const removeFood = async (req,res) =>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        
        if(!food){
            res.status(404).json({
                message: "Food Item Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Food Removed",
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message: "Failed to Remove Food",
            error: err,
        });
    }
}

export {addFood,listFood,removeFood}