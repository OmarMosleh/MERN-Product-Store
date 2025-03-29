import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getProducts =  async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("error getting products", error.message);
      res.status(500).json({ success: false, message: "Error getting products" });
    }
  }

  export const createProduct = async (req, res) => {
    const product = req.body; //user will send this data
    console.log(product);
    if (!product.name || !product.price || !product.image) {
      return res
        .status(400)
        .json({ success: false, message: "please provide all fields" });
    }
    const newProduct = new Product(product);
    try {
      await newProduct.save();
      res.status(200).json({ success: true, data: newProduct });
    } catch (error) {
      console.error("Error in create new product", error.message);
      res.status(500).json({ success: false, message: "server error " });
    }
  }

  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "server error" });
    }
  }

  export const removeProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "product deleted" });
    } catch (error) {
      console.error("error deleting item");
      res.status(404).json({ success: false, message: "couldn't delete item" });
    }
  }