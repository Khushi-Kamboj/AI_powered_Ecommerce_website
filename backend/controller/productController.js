import uploadOnCloudinary from "../config/cloudinary.js";
import Product from '../model/productModel.js'

export const addProduct = async(req , res) =>{
     try{
        let {name, description , price , category , subCategory, sizes , bestseller} = req.body;
        // helper to safely upload when a file was provided
        const safeUpload = async (fileField) => {
            if (!req.files || !req.files[fileField] || !req.files[fileField][0]) return null;
            const result = await uploadOnCloudinary(req.files[fileField][0].path);
            return result?.secure_url || null;
        }

        const image1 = await safeUpload('image1');
        const image2 = await safeUpload('image2');
        const image3 = await safeUpload('image3');
        const image4 = await safeUpload('image4');
        
        let productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes || '[]'),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
        }

        // Attach only provided image URLs
        if (image1) productData.image1 = image1;
        if (image2) productData.image2 = image2;
        if (image3) productData.image3 = image3;
        if (image4) productData.image4 = image4;

        const product = await Product.create(productData);
        return res.status(201).json(product);

    }catch(error){
        console.log("Add product error");
        return res.status(500).json({message:`Add product error ${error}`});

     }
}