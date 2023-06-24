import cartService from "../service/cartService.js";
import Cart from "../model/cart.js";
let getAllCart = async (req, res) => {
  try {
    const email = req.query.email;
    const data = await cartService.getAllCart(email);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("There are no cart!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
let AddUpdateCart = async (req, res) => {
  try {
    const cartData = req.body;
    const result = await Cart.findOne({
      email: cartData.email,
      bookId: cartData.bookId,
    });
    if (result) {
      result.quantity = Number(result.quantity) + Number(cartData.quantity);
      await result.save();
      return res.status(200).json({
        EC: 0,
        errMessage: "Add to cart success!",
        data: result,
      });
    } else {
      const rs = await Cart.create({
        email: cartData.email,
        bookId: cartData.bookId,
        quantity: cartData.quantity,
      });
      return res.status(200).json({
        EC: 0,
        errMessage: "Add to cart success!",
        data: rs,
      });
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};

let deleteAllCart = async (req, res) => {
  try {
    const data = await cartService.deleteAllCart();
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("delete all cart failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
const deleteCart = async (req, res) => {
  try {
    const cartData = req.body;

    const result = await Cart.findOneAndDelete({
      email: cartData.email,
      bookId: cartData.bookId,
    });
    return res.status(200).json({
      EC: 0,
      errMessage: "Delete this cart success!",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      errMessage: e.message,
    });
  }
};
let updateCartById = async (req, res) => {
  try {
    let bookId = req.body.bookId;
    let quantity = req.body.quantity;
    const data = await cartService.updateCartById(bookId, quantity);
    if (data) {
      return res.status(200).json(data);
    } else {
      throw new Error("update the cart failed!");
    }
  } catch (e) {
    return res.status(500).json({
      EC: 1,
      EM: e.message,
    });
  }
};
const cartController = {
  getAllCart,
  deleteAllCart,
  AddUpdateCart,
  deleteCart,
  updateCartById,
};
export default cartController;
