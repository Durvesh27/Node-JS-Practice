import ProductModal from "../Modals/Product.Modal.js";
import jwt from "jsonwebtoken";
export const addProduct = async (req, res) => {
  try {
    const { name, price, category, image, token } = req.body;
    if (!name || !category || !image || !price || !token) {
      return res
        .status(404)
        .json({ status: "error", message: "All Fields Mandatory" });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
      return res
        .status(404)
        .json({ status: "error", message: "Token not valid" });
    }
    const userId = decodedData?.userId;
    const product = new ProductModal({
      name,
      price,
      image,
      category,
      userId: userId,
    });
    await product.save();

    return res.status(201).json({ status: "Success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

export const allProducts = async (req, res) => {
  try {
    const products = await ProductModal.find({});
    if (products.length) {
      return res.status(200).json({ status: "success", products: products });
    }
    return res
      .status(404)
      .json({ status: "error", message: "No Products found" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

export const getYourProduct = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
      return res
        .status(404)
        .json({ status: "error", message: "Token not valid" });
    }
    const userId = decodedData?.userId;
    const yourProducts = await ProductModal.find({ userId: userId });
    if (yourProducts.length) {
      return res
        .status(200)
        .json({ status: "success", products: yourProducts });
    }
    return res
      .status(404)
      .json({ status: "error", message: "No Products found" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

export const updateYourProduct = async (req, res) => {
  try {
    const { productId, name, price, category, image, token } = req.body;
    if (!token)
      return res
        .status(404)
        .json({ status: "error", message: "Token is required" });
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
      return res
        .status(404)
        .json({ status: "error", message: "Token not valid" });
    }
    const userId = decodedData?.userId;

    const updatedProduct = await ProductModal.findOneAndUpdate(
      { _id: productId, userId: userId },
      { name, price, category, image },
      { new: true }
    );
    if (updatedProduct) {
      return res
        .status(200)
        .json({ status: "Sucess", product: updatedProduct });
    }
    return res
      .status(404)
      .json({
        status: "error",
        message: "You are trying to update product which is not yours..",
      });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};
