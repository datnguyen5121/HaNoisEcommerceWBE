import Cart from "../model/cart.js";

let getAllCart = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Cart.find(
        { email: email },
        { createdAt: 0, updatedAt: 0, email: 0, _id: 0 },
      ).populate("bookId", { createdAt: 0, updatedAt: 0 });
      resolve({
        EC: 0,
        EM: "Get all cart success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateCartById = (inputId, inputData) => {
  return new Promise(async (resolve, reject) => {
    console.log("inputData", inputData);
    try {
      const data = await Cart.findOneAndUpdate(
        { bookId: inputId },
        {
          quantity: inputData,
        },
        {
          new: true,
        },
      );

      console.log("data", data);
      resolve({
        EC: 0,
        EM: "update the cart success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteAllCart = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Cart.deleteMany({});
      resolve({
        EC: 0,
        EM: "delete the cart success!",
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const cartService = {
  getAllCart,
  deleteAllCart,
  updateCartById,
};
export default cartService;
