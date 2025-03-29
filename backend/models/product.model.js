import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, price:{
        type: Number,
        required: true
    }, image : {
        type: String,
        required: true
    }},{
    timestamps: true // created/updated at
});

const Product = mongoose.model('Product', productSchema);
// we write Product -single and capitalized as mong will handle it in the future to-
export default Product;