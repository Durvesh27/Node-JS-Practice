import ProductModal from "../Modals/Product.Modal.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, category,image ,token} = req.body;
    if (!name || !category || !image || !price || !token) {
      return res
        .status(404)
        .json({ status: "error", message: "All Fields Mandatory" });
    }

    const product=new ProductModal({name,price,image,category})
    await product.save()

    return res.status(201).json({status:"Success"})
  } catch (error) {
    res.status(500).json({ status: "Error", message: error });
  }
};
