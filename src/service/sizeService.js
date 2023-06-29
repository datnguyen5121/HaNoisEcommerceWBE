import Size from "../model/size.js";

// createNewSize,
//   getAllSize,
//   updateSize,
//   deleteSize,
let getAllSize = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Size.find({}).select(" subnavName size");
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

let createNewSize = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Size.create({
        subnavName: data.subnavName,
        size: data.size,
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

let updateSize = (inputId, inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Size.findOneAndUpdate(
        { navName: inputId },
        {
          size: inputData.size,
        },
      );
      resolve({
        EC: 0,
        EM: "update the product success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteSizeById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Size.findByIdAndDelete({ _id: inputId });
      resolve({
        EC: 0,
        EM: "delete the size success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const sizeService = {
  getAllSize,
  createNewSize,
  updateSize,
  deleteSizeById,
};
export default sizeService;
