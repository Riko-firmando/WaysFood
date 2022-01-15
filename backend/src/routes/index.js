const express = require("express");

const router = express.Router();

const { login, register, checkAuth } = require("../controllers/auth");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  addProduct,
  getProducts,
  getProduct,
  getProductByUser,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  userTransactions,
} = require("../controllers/transaction");
const {
  getCarts,
  addCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");
const { addOrder } = require("../controllers/order");
const { updateProfile } = require("../controllers/profile");

// middleware
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// auth
router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

// user
router.get("/users", getUsers);
router.get("/user", auth, getUser);
router.patch("/user", auth, updateUser);
router.delete("/user/:id", deleteUser);

// product
router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductByUser);
router.get("/product/:id", getProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// transaction
router.get("/transactions", auth, getTransactions);
router.get("/transaction/:id", auth, getTransaction);
router.post("/transaction", auth, addTransaction);
router.patch("/transaction/:id", auth, updateTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);
router.get("/my-transaction", auth, userTransactions);

// cart
router.get("/carts", auth, getCarts);
router.post("/cart", auth, addCart);
router.patch("/cart/:id", auth, updateCart);
router.delete("/cart/:id", auth, deleteCart);

// order
router.post("/order", addOrder);

// profile
router.patch("/profile", auth, uploadFile("image"), updateProfile);

module.exports = router;
