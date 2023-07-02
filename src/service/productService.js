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
      console.log("datttttttttttt");
      const result = await Product.create({
        gender: data.gender,
        productName: data.productName,
        title: data.title,
        description: data.description,
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
let getProductByGender = (inputGender) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.find({ gender: inputGender });
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
let getProductByGenderProduct = (inputGender, inputProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.find({ gender: inputGender, productName: inputProduct });
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
let getProductByGenderCategory = (gender, inputCategory, productName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.find({
        gender: gender,
        productName: productName,
        category: { $in: inputCategory },
      });
      console.log(data);

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
let updateProductById = (
  _id,
  gender,
  price,
  title,
  imgUrl,
  productName,
  description,
  category,
  size,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(_id, gender, price, title, imgUrl, productName, description, category, size);
      const data = await Product.findByIdAndUpdate(
        { _id: _id },
        {
          gender: gender,
          productName: productName,
          title: title,
          description: description,
          category: category,
          size: size,
          imgUrl: imgUrl,
          price: price,
        },
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

let getSearchValue = (inputValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Product.find({
        $or: [
          {
            title: {
              $regex: escapeStringRegexp(inputValue),
              $options: "i",
            },
          },
          { category: { $in: [new RegExp(inputValue, "i")] } },
        ],
      });
      resolve({
        EC: 0,
        EM: "Get search value success!",
        data: data,
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
  getProductByGender,
  getProductByGenderProduct,
  getProductByGenderCategory,
  // getBookPaginate,
  // getBookPaginateType,
  getSearchValue,
};
export default productService;
