import productTag from "../model/productTag.js";
import tagService from "../service/tagService.js";

let getTag = async (req, res) => {
  try {
    let id = req.query._id;
    const data = await tagService.getTag(id);
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
let getAllTag = async (req, res) => {
  try {
    const data = await tagService.getAllTag();
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("get all  tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let createNewTag = async (req, res) => {
  try {
    let dataReq = req.body;
    const data = await tagService.createNewTag(dataReq);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("create tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let updateTagById = async (req, res) => {
  try {
    let id = req.body._id;
    let dataReq = req.body;
    const data = await tagService.updateTagById(id, dataReq);
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
let deleteTag = async (req, res) => {
  try {
    let id = req.body._id;
    const data = await tagService.deleteTag(id);
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
let createNewProductTag = async (req, res) => {
  try {
    let dataReq = req.body;
    const data = await tagService.createNewProductTag(dataReq);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("create tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let getProductTag = async (req, res) => {
  try {
    let dataReq = req.body;
    const data = await tagService.getProductTag(dataReq);
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
let getAllProductTag = async (req, res) => {
  try {
    let dataReq = req.body;
    const data = await tagService.getAllProductTag();
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("get all product tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let updateProductTag = async (req, res) => {
  try {
    let id = req.body._id;
    let dataReq = req.body;
    const data = await tagService.updateProductTag(id, dataReq);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("update product tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let deleteProductTag = async (req, res) => {
  try {
    let id = req.body._id;
    const data = await tagService.deleteProductTag(id);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("delete product tag failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
const tagController = {
  updateProductTag,
  getTag,
  getAllTag,
  deleteTag,
  createNewTag,
  updateTagById,
  createNewProductTag,
  getProductTag,
  getAllProductTag,
  deleteProductTag,
};
export default tagController;
