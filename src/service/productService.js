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
// let getBookPaginate = (dataInput) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // let perPage = 5; // số lượng sản phẩm xuất hiện trên 1 page
//       // let page = 1;
//       const totalBook = await Book.countDocuments({});
//       const listBook = await Book.find({})
//         .skip(dataInput.limit * dataInput.page - dataInput.limit) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
//         .limit(dataInput.limit);
//       //Cách 2 lấy total bằng exec
//       // .exec((err, products)=> {
//       //   products.countDocuments((err,count)=> {
//       //       if(err) return next(err);
//       //           resizeBy.send(products)
//       //   })
//       // })
//       resolve({
//         EC: 0,
//         EM: "Get the book success!",
//         data: { listBook, totalBook },
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
// let getBookPaginateType = (dataInput) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // let perPage = 5; // số lượng sản phẩm xuất hiện trên 1 page
//       // let page = 1;
//       let total;
//       const listBook = await Book.find({
//         category: dataInput.category,
//       })
//         .skip(dataInput.limit * dataInput.page - dataInput.limit) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
//         .limit(dataInput.limit);
//       if (listBook && listBook.length > 0) {
//         total = listBook.length;
//       }
//       resolve({
//         EC: 0,
//         EM: "Get the book success!",
//         data: { listBook, total },
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
// let getBookPaginateSearch = (dataInput) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // let perPage = 5; // số lượng sản phẩm xuất hiện trên 1 page
//       // let page = 1;
//       let total;
//       const $regex = escapeStringRegexp(dataInput.valueText);
//       console.log($regex);
//       const listBookTotal = await Book.find({
//         title: { $regex },
//       });
//       if (listBookTotal && listBookTotal.length > 0) {
//         total = listBookTotal.length;
//       }

//       const listBook = await Book.find({
//         title: { $regex },
//       })
//         //   // $text: { $search: dataInput.valueText }, .. tìm kiếm full -text
//         .skip(dataInput.limit * dataInput.page - dataInput.limit) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
//         .limit(dataInput.limit);

//       resolve({
//         EC: 0,
//         EM: "Get the book success!",
//         data: { listBook, total },
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let createNewProduct = async (data) => {
//   try {
//     console.log("service", data);
//     const imageUrls = [];

//     for (const image of data.images) {
//       const imageUrl = await uploadImageToFirebase(data.title, image);
//       imageUrls.push(imageUrl);
//     }

//     const result = await Product.create({
//       productName: data.productName,
//       title: data.title,
//       description: data.description,
//       datePublish: data.datePublish,
//       category: data.category,
//       size: data.size,
//       imageUrls: imageUrls,
//       price: data.price,
//     });

//     return {
//       EC: 0,
//       EM: "create new product success!",
//       data: result,
//     };
//   } catch (e) {
//     throw e;
//   }
// };

// let createNewProduct = async (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await Product.create({
//         productName: data.productName,
//         title: data.title,
//         description: data.description,
//         datePublish: data.datePublish,
//         category: data.category,
//         size: data.size,
//         imgUrl: await getLinks(data),
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

let createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("service", data);
      const result = await Product.create({
        gender: data.gender,
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
    }
  });
};

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
  // getBookPaginate,
  // getBookPaginateType,
};
export default productService;
