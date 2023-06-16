import JWTaction from "../middleware/JWTaction.js";
import userService from "../service/userService.js";

let handleUserLogin = async (req, res) => {
  try {
    let emailInput = req.body.email;
    let passwordInput = req.body.password;
    if (!emailInput || !passwordInput) {
      return res.status(500).json({
        EC: 1,
        message: "Missing inputs parameter!",
      });
    }
    const data = await userService.handleUserLogin(emailInput, passwordInput);
    //set cookie
    res.cookie("jwt", data.DT.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      // maxAge: 1,
    });
    res.cookie("jwt_refresh", data.DT.refresh_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("There are no user!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let getAllUser = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("There are no user!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let createNewUser = async (req, res) => {
  try {
    let dataReq = req.body;
    const data = await userService.createNewUser(dataReq);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("create user failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let deleteUserById = async (req, res) => {
  try {
    let id = req.query._id;
    const data = await userService.deleteUserById(id);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("delete user failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let deleteAllUser = async (req, res) => {
  try {
    const data = await userService.deleteAllUser();
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("delete all user failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let updateUserById = async (req, res) => {
  try {
    let id = req.body._id;
    let dataReq = req.body;
    const data = await userService.updateUserById(id, dataReq);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("update the user failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let getTokenRefresh = async (req, res) => {
  // refresh the damn token
  return new Promise(async (resolve, reject) => {
    try {
      const { refresh_token } = req.body;
      // if refresh token exists
      if (!refresh_token) throw createError.BadRequest();
      let user = await JWTaction.checkUserJWT(refresh_token);
      let tokenAccess = JWTaction.createJWT(user);
      let tokenRefresh = JWTaction.createJWTRefresh(user);
      resolve({
        EC: 0,
        EM: "OK",
        DT: {
          access_token: tokenAccess,
          refresh_token: tokenRefresh,
        },
      });
    } catch (err) {
      reject(e);
    }
  });
};
const handleUserRegister = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataReq = req.body;
      const data = await userService.handleUserRegister(dataReq);
      if (data) {
        return res.status(200).json(data);
      } else {
        throw new Error("register the user failed!");
      }
    } catch (e) {
      reject(e);
    }
  });
};
const userController = {
  handleUserLogin,
  getAllUser,
  createNewUser,
  deleteUserById,
  deleteAllUser,
  updateUserById,
  getTokenRefresh,
  handleUserRegister,
};
export default userController;
