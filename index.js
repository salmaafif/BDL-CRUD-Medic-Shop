import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.models.js";
import productRoutes from './routes/product.route.js'

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//routes
app.use("/api/products", productRoutes)

mongoose
  .connect(
    "mongodb+srv://salmaafifa:Salma12Azizi@basisdata.fyksn.mongodb.net/MedicShop?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => {
    console.log("Error connecting to MongoDB...");
  });
