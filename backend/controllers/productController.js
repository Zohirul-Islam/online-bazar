import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
const addProduct = async (req, res) => {

    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        console.log(sizes);
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        const images = [image1, image2, image3, image4].filter(item => item !== undefined);
        
        let imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller:bestseller === "true" ?true:false,
            sizes: sizes ? JSON.parse(sizes) : [],
            image: imagesUrl,
            date:Date.now()
            
        }
        console.log(productData);
        const product = new productModel(productData);
        await product.save();
        res.json({success:true,message:"product added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
    }
}
const removeProduct = async(req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "product deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
    }
}
const listProduct = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;   // current page
    const limit = Number(req.query.limit) || 5; // products per page

    const totalProducts = await productModel.countDocuments();

    const products = await productModel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const singleProduct = async(req,res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export {
    addProduct,removeProduct,listProduct,singleProduct
}