import env from "dotenv";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import JWTaction from "../middleware/JWTaction.js";
env.config();

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkEmailUser(email);
      console.log("isExist", isExist);
      if (isExist) {
        let user = await User.findOne({ email: email });
        console.log("user", user);

        if (user) {
          let passwordDb = user.password;
          console.log("passwordDb", passwordDb);
          let passwordHash = await hashUserPassword(password);
          console.log("passwordHash", passwordHash);

          let check = await bcrypt.compareSync(password, passwordDb);
          console.log(check);
          if (check) {
            // let token
            //test token
            let payload = {
              email: user.email,
              expiresIn: process.env.JWT_EXPIRES_IN,
              roleId: user.roleId,
            };
            let payloadRefresh = {
              email: user.email,
              expiresRefreshIn: process.env.JWT_REFRESH_EXPIRES_IN,
              roleId: user.roleId,
            };
            let token = JWTaction.createJWT(payload);
            let tokenRefresh = JWTaction.createJWTRefresh(payloadRefresh);
            resolve({
              EC: 0,
              EM: "OK",
              DT: {
                access_token: token,
                refresh_token: tokenRefresh,
                infoUser: user,
              },
            });
          } else {
            resolve({
              EC: 2,
              EM: "this password doesn't exist",
            });
          }
        } else {
          resolve({
            EC: 1,
            EM: "This user doesn't exist",
          });
        }
      } else {
        resolve({
          EC: 3,
          EM: "This email doesn't exist",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmailUser = (inputEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await User.findOne({ email: inputEmail });
      if (data) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await User.find({});
      resolve({
        EC: 0,
        EM: "Get all User success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    let passwordNotHash = data.password;
    let passwordHash = await hashUserPassword(passwordNotHash);
    let isExist = await checkEmailUser(data.email);
    try {
      if (isExist === false) {
        const result = await User.create({
          email: data.email,
          password: passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.gender,
          roleId: "USER",
        });
        resolve({
          EC: 0,
          EM: "register new user success!",
          data: result,
        });
      } else {
        resolve({
          EC: 1,
          EM: "register new user false!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    let passwordNotHash = data.password;
    let passwordHash = await hashUserPassword(passwordNotHash);
    try {
      const result = await User.create({
        email: data.email,
        password: passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
        roleId: data.roleId,
      });
      resolve({
        EC: 0,
        EM: "create new user success!",
        data: result,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await User.findByIdAndDelete({ _id: inputId });
      resolve({
        EC: 0,
        EM: "delete the user success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await User.deleteMany({});
      resolve({
        EC: 0,
        EM: "delete all book success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateUserById = (inputId, inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await User.findByIdAndUpdate(
        { _id: inputId },
        {
          email: inputData.email,
          password: inputData.password,
          firstName: inputData.firstName,
          lastName: inputData.lastName,
          address: inputData.address,
          gender: inputData.gender,
          roleId: inputData.roleId,
        },
      );
      resolve({
        EC: 0,
        EM: "update the user success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const UserService = {
  handleUserLogin,
  getAllUser,
  createNewUser,
  deleteUserById,
  deleteAllUser,
  updateUserById,
  handleUserRegister,
};
export default UserService;
