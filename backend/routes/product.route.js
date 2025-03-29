import express from 'express'
import { createProduct, getProducts, removeProduct, updateProduct } from '../controllers/product.contoller.js';

const router = express.Router();
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct); // you can use patch commonly used for updating some fields and put for the whole product
router.delete("/:id", removeProduct);

export default router;