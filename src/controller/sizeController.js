import sizeService from "../service/sizeService.js";

let getAllSize = async (req, res) => {
  try {
    const data = await sizeService.getAllSize();
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("get tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let createNewSize = async (req, res) => {
  try {
    let dataReq = req.body;
    const data = await sizeService.createNewSize(dataReq);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("create size failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let updateSize = async (req, res) => {
  try {
    let dataReq = req.body;
    const data = await sizeService.updateSize(dataReq);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("update tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let deleteSize = async (req, res) => {
  try {
    let id = req.body._id;
    const data = await sizeService.deleteSize(id);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("delete tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
const sizeController = {
  createNewSize,
  getAllSize,
  updateSize,
  deleteSize,
};
export default sizeController;
