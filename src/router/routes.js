import cartController from '../controller/cartController.js';
import userController from '../controller/userController.js';
// import JWTaction from "../middleware/JWTaction.js";
import productController from '../controller/productController.js';
const routes = (app) => {
    // app.all("*", JWTaction.checkUserJWT, JWTaction.checkUserPermission);

    // app.get(
    //   "/api/get-all-book",
    //   JWTaction.checkUserJWT,
    //   JWTaction.checkADMINPermission,
    //   bookController.getAllBook,
    // );
    // app.get("/api/get-all-book", bookController.getAllBook);
    // app.get("/api/get-book-paginate", bookController.getBookPaginate);
    // app.get("/api/get-book-paginate-type", bookController.getBookPaginateType);
    // app.get("/api/get-book-paginate-search", bookController.getBookPaginateSearch);

    // app.post("/api/create-new-book", JWTaction.checkUserJWT, bookController.createNewBook);
    app.post('/api/create-new-product', productController.createNewProduct);
    app.get('/api/get-product-by-id', productController.getProductById);
    app.get('/api/get-product-by-category', productController.getProductByCategory);
    app.delete('/api/delete-product-by-id', productController.deleteProductById);
    app.delete('/api/delete-all-product', productController.deleteAllProduct);
    app.put('/api/update-product-by-id', productController.updateProductById);

    // app.get(
    //   "/api/get-all-user",
    //   JWTaction.checkUserJWT,
    //   JWTaction.checkADMINPermission,
    //   userController.getAllUser,
    // );
    app.post('/api/create-new-user', userController.createNewUser);
    app.delete('/api/delete-user-by-id', userController.deleteUserById);
    // app.delete("/api/delete-all-user", userController.deleteAllUser);
    app.put('/api/update-user-by-id', userController.updateUserById);
    // app.post("/api/handle-login", userController.handleUserLogin);
    // app.post("/api/handle-register", userController.handleUserRegister);

    // app.post("/refresh-token", userController.getTokenRefresh);

    // //Cart
    app.get('/api/get-all-cart', cartController.getAllCart);
    app.post('/api/add-update-cart', cartController.AddUpdateCart);
    app.post('/api/update-cart-by-id', cartController.updateCartById);

    // app.delete("/api/delete-all-cart", cartController.deleteAllCart);
    // app.delete("/api/delete-cart", cartController.deleteCart);
};

export default routes;
