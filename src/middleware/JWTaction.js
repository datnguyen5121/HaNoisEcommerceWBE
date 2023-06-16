import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

const nonSecurePaths = ["/", "/handle-login"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (err) {
    console.log(err);
  }
  return token;
};

const createJWTRefresh = (payload) => {
  let key = process.env.JWT_REFRESH_EXPIRES_IN;
  let token_refresh = null;
  try {
    token_refresh = jwt.sign(payload, key);
  } catch (err) {
    console.log(err);
  }
  return token_refresh;
};
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (err) {
    console.log(err);
  }
  return decoded;
};
const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EC: -999,
        data: "",
        EM: "Not authenticated the user",
      });
    }
    console.log("my jwt: ", cookies.jwt);
  } else {
    return res.status(401).json({
      EC: -999,
      data: "",
      EM: "Not authenticated the user",
    });
  }
};

// mẫu check user permission
const checkADMINPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  if (req.user) {
    let email = req.user.email;
    let role = req.user.roleId;
    if (role === "ADMIN") {
      console.log("role", role);
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You dont have the permission to access this resource...",
      });
    }
    // let roles = req.user.groupWithRoles.Roles ( Lưu ý groupWithRoles.Roles là dữ liệu data lấy role từ payload của token)
    // let currentUrl = req.path;
    // if (!roles || roles.length === 0) {
    //   return res.status(403).json({
    //     EC: -1,
    //     DT: "",
    //     EM: "You dont have the permission to access this resource...",
    //   });
    // }
    // let canAccess = roles.some((item) => item.url === currentUrl);
    // if (canAccess === true) {
    //   next();
    // } else {
    //   return res.status(403).json({
    //     EC: -1,
    //     DT: "",
    //     EM: "You dont have the permission to access this resource...",
    //   });
    // }
  } else {
    return res.status(401).json({
      EC: -999,
      data: "",
      EM: "Not authenticated the user",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  if (req.user) {
    let email = req.user.email;
    let role = req.user.roleId;
    if (role === "USER") {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You dont have the permission to access this resource...",
      });
    }
    next();
  } else {
    return res.status(401).json({
      EC: -999,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};
const JWTaction = {
  createJWT,
  createJWTRefresh,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
  checkADMINPermission,
};
export default JWTaction;
