// entry point for our API
// const express = require ('express');
import express from "express";
// to use the upper syntax go change in the package.json create "type" : "module"
import dotenv from "dotenv";
dotenv.config();
// this package was used so we can read the variables in the env file in process.env.MONGO_URI
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use("/api/products", productRoutes);
// console.log(process.env.MONGO_URI);
app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});
// Rkys2QnC5lUNlPlK
// mongodb+srv://omarmosleh90:Rkys2QnC5lUNlPlK@cluster0.maxsstl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
