import productService from "../service/productService.js";
import getLinks from "../service/firebaseService.js";
let getAllProduct = async (req, res) => {
  try {
    const data = await productService.getAllProduct();
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("There are no product!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let createNewProduct = async (req, res) => {
  try {
    const { title, description, datePublish, category, size } = req.body;
    const files = req.files;
    const imgUrl = await getLinks(files);
    const data = await productService.createNewProduct({
      // gender,
      title,
      description,
      datePublish,
      category,
      size,
      imgUrl,
      // price,
    });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let getProductById = async (req, res) => {
  try {
    let id = req.query._id;
    const data = await productService.getProductById(id);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("get product failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let getProductByCategory = async (req, res) => {
  try {
    let category = req.query.category;
    const data = await productService.getProductByCategory(category);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("get product failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let deleteProductById = async (req, res) => {
  try {
    let id = req.body.id;
    const data = await productService.deleteProductById(id);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("delete product failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let deleteAllProduct = async (req, res) => {
  try {
    const data = await productService.deleteAllProduct();
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("delete all product failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let updateProductById = async (req, res) => {
  try {
    let id = req.body._id;
    let dataReq = req.body;
    const data = await productService.updateProductById(id, dataReq);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("update the product failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
const productController = {
  getAllProduct,
  createNewProduct,
  getProductById,
  deleteProductById,
  deleteAllProduct,
  updateProductById,
  getProductByCategory,
  // getBookPaginate,
  // getBookPaginateType,
  // getBookPaginateSearch,
};

export default productController;
