import cartController from "../controller/cartController.js";
import userController from "../controller/userController.js";
import JWTaction from "../middleware/JWTaction.js";
import productController from "../controller/productController.js";
import tagController from "../controller/tagController.js";
import multer from "multer";
import stripe from "stripe";

// Configure multer
const storage = multer.memoryStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage: storage });

let stripeGateway = stripe(process.env.STRIPE_SECRET_KEY);
let DOMAIN = process.env.DOMAIN;

const routes = (app) => {
  // app.all("*", JWTaction.checkUserJWT, JWTaction.checkUserPermission);

  app.get("/api/get-all-product", productController.getAllProduct);

  // app.get("/api/get-all-book", bookController.getAllBook);
  // app.get("/api/get-book-paginate", bookController.getBookPaginate);
  // app.get("/api/get-book-paginate-type", bookController.getBookPaginateType);
  // app.get("/api/get-book-paginate-search", bookController.getBookPaginateSearch);

  // app.post("/api/create-new-book", JWTaction.checkUserJWT, bookController.createNewBook);
  app.post(
    "/api/create-new-product",
    upload.fields([
      { name: "imgUrl0", maxCount: 1 },
      { name: "imgUrl1", maxCount: 1 },
      { name: "imgUrl2", maxCount: 1 },
      { name: "imgUrl3", maxCount: 1 },
      { name: "imgUrl4", maxCount: 1 },
    ]),
    productController.createNewProduct
  );
  app.get("/api/get-product-by-id", productController.getProductById);
  app.get(
    "/api/get-product-by-category",
    productController.getProductByCategory
  );
  app.get(
    "/api/get-product-by-gender-category",
    productController.getProductByGenderCategory
  );

  app.delete("/api/delete-product-by-id", productController.deleteProductById);
  app.delete("/api/delete-all-product", productController.deleteAllProduct);
  app.put("/api/update-product-by-id", productController.updateProductById);

  app.get(
    "/api/get-all-user",
    // JWTaction.checkUserJWT,
    // JWTaction.checkADMINPermission,
    userController.getAllUser
  );
  app.post("/api/create-new-user", userController.createNewUser);
  app.delete("/api/delete-user-by-id", userController.deleteUserById);
  // app.delete("/api/delete-all-user", userController.deleteAllUser);
  app.put("/api/update-user-by-id", userController.updateUserById);
  app.post("/api/handle-login", userController.handleUserLogin);
  app.post("/api/handle-register", userController.handleUserRegister);

  // app.post("/refresh-token", userController.getTokenRefresh);

  // //Cart
  app.get("/api/get-all-cart", cartController.getAllCart);
  app.post("/api/add-update-cart", cartController.AddUpdateCart);
  app.post("/api/update-cart-by-id", cartController.updateCartById);

  // app.delete("/api/delete-all-cart", cartController.deleteAllCart);
  // app.delete("/api/delete-cart", cartController.deleteCart);

  app.get("/api/get-tag", tagController.getTag);
  app.get("/api/get-all-tag", tagController.getAllTag);

  app.get("/api/get-all-tag", tagController.getAllTag);
  app.get("/api/get-all-tag-admin", tagController.getAllTagAdmin);
  app.put("/api/update-tag", tagController.updateTagById);
  app.post("/api/create-new-tag", tagController.createNewTag);
  app.delete("/api/delete-tag", tagController.deleteTag);

  app.post("/api/create-new-product-tag", tagController.createNewProductTag);
  app.put("/api/update-product-tag", tagController.updateProductTag);
  app.post("/api/get-product-tag", tagController.getProductTag);
  app.get("/api/get-all-product-tag", tagController.getAllProductTag);
  app.delete("/api/delete-product-tag", tagController.deleteProductTag);

  app.post("/api/stripe-payment", async (req, res) => {
    try {
      const lineItems = req.body.map((item) => {
        return {
          price_data: {
            currency: "vnd",
            product_data: {
              name: item.title,
              images: [item.imageUrl],
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      });
      const session = await stripeGateway.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${DOMAIN}/?success=true`,
        cancel_url: `${DOMAIN}/?success=false`,
        line_items: lineItems,
        billing_address_collection: "required",
      });

      return res.status(200).json({ stripeSession: session });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        EC: 1,
        EM: err.message,
      });
    }
  });
};

export default routes;
