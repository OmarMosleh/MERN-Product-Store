// entry point for our API
// const express = require ('express');
import express from "express";
// to use the upper syntax go change in the package.json create "type" : "module"
import dotenv from "dotenv";
import path from "path"
dotenv.config();
// this package was used so we can read the variables in the env file in process.env.MONGO_URI
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res)=> {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});
