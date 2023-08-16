const express = require("express");
const cartController = require("../controller/cartController");
const authController = require("../controller/authController");

const router = express.Router();

router.get(
  "/addToCart/:productId",
  authController.protect,
  cartController.addToCart
);

router.post(
  "/decQuantity/:productId",
  authController.protect,
  cartController.decByOne
); //Decrease quantity by 1

router.post(
  "/removeFromCart/:productId",
  authController.protect,
  cartController.deleteFromCart
);

router.post("/cart_checkout", authController.protect, cartController.checkOut);

router.get("/getCart", authController.protect, cartController.getCart);

module.exports = router;
