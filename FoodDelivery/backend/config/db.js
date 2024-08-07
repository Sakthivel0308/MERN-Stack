import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/FoodDelivery")
    .then(() => {
      console.log("Connected to database");
    })
    .catch(() => {
      console.log("Error connecting to database");
    });
};
