import Product from "../model/product.js";
import escapeStringRegexp from "escape-string-regexp";
import getLinks from "./firebaseService.js";
let getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.find({});
      resolve({
        EC: 0,
        EM: "Get all product success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createNewProduct = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Product.create({
        gender: data.gender,
        productName: data.productName,
        title: data.title,
        description: data.description,
        datePublish: data.datePublish,
        category: data.category,
        size: data.size,
        imgUrl: data.imgUrl,
        price: data.price,
      });
      resolve({
        EC: 0,
        EM: "create new product success!",
        data: result,
      });
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};

// let createNewProduct = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       console.log("service", data);
//       const result = await Product.create({
//         gender: data.gender,
//         title: data.title,
//         description: data.description,
//         datePublish: data.datePublish,
//         category: data.category,
//         size: data.size,
//         imgUrl: data.imgUrl,
//         price: data.price,
//       });
//       resolve({
//         EC: 0,
//         EM: "create new product success!",
//         data: result,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getProductById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.findById({ _id: inputId });
      resolve({
        EC: 0,
        EM: "Get the product success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getProductByCategory = (inputCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.find({ category: { $in: inputCategory } });
      resolve({
        EC: 0,
        EM: "Get the product success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getProductByGenderCategory = (gender, productName, inputCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.find(
        { gender: gender },
        { productName: productName },
        { category: { $in: inputCategory } }
      );

      resolve({
        EC: 0,
        EM: "Get product by category success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteProductById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.findByIdAndDelete({ _id: inputId });
      resolve({
        EC: 0,
        EM: "delete the product success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.deleteMany({});
      resolve({
        EC: 0,
        EM: "delete the product success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateProductById = (inputId, inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.findByIdAndUpdate(
        { _id: inputId },
        {
          gender: inputData.gender,
          productName: inputData.productName,
          title: inputData.title,
          description: inputData.description,
          datePublish: inputData.datePublish,
          category: inputData.category,
          size: inputData.size,
          imgUrl: inputData.imgUrl,
          price: inputData.price,
        }
      );
      resolve({
        EC: 0,
        EM: "update the product success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const productService = {
  getAllProduct,
  createNewProduct,
  getProductById,
  deleteProductById,
  // getBookPaginateSearch,
  getProductByCategory,
  deleteAllProduct,
  updateProductById,
  getProductByGenderCategory,
  // getBookPaginate,
  // getBookPaginateType,
};
export default productService;
