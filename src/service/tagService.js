import Tag from "../model/tag.js";
import productTag from "../model/productTag.js";
let getTag = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Tag.findById({
        _id: inputId,
      });
      resolve({
        EC: 0,
        EM: "get tag success!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllTag = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Tag.find({}).select("_id navName").lean(); // Populate the "navName" field with the referenced Tag model
      resolve({
        EC: 0,
        EM: "get all product tag success!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let createNewTag = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Tag.create({
        navName: data.navName,
      });
      resolve({
        EC: 0,
        EM: "create new tag success!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateTagById = (inputId, inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Tag.findByIdAndUpdate(
        { _id: inputId },
        {
          navName: inputData.navName,
        },
      );
      resolve({
        EC: 0,
        EM: "update the tag success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteTag = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Tag.findByIdAndDelete({ _id: inputId });
      await productTag.deleteMany({ navName: inputId });
      resolve({
        EC: 0,
        EM: "delete the tag success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let createNewProductTag = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await productTag.create({
        subnavName: data.subnavName,
        list: data.list,
        navName: data.navName,
      });
      resolve({
        EC: 0,
        EM: "create new product tag success!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getProductTag = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await productTag
        .findOne({
          subnavName: data.subnavName,
          navName: data.navName,
        })
        .populate({ path: "navName", select: "navName" }); // Populate the "navName" field with the referenced Tag model
      resolve({
        EC: 0,
        EM: "get new product tag success!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateProductTag = (inputId, inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await productTag.findByIdAndUpdate(
        { _id: inputId },
        {
          subnavName: inputData.subnavName,
          list: inputData.list,
        },
      );
      resolve({
        EC: 0,
        EM: "update the tag success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllProductTag = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await productTag
        .find()
        .populate({ path: "navName", select: "navName" })
        .select("_id list subnavName navName")
        .lean(); // Populate the "navName" field with the referenced Tag model
      resolve({
        EC: 0,
        EM: "get all product tag success!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteProductTag = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await productTag.findByIdAndDelete({ _id: inputId });
      resolve({
        EC: 0,
        EM: "delete the product tag success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const tagService = {
  getTag,
  getAllTag,
  createNewTag,
  updateTagById,
  deleteTag,
  createNewProductTag,
  getProductTag,
  getAllProductTag,
  updateProductTag,
  deleteProductTag,
};
export default tagService;
