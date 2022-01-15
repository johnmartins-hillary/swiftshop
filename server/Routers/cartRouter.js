import express from "express";
import data from "../data.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { generateToken, isAuth } from "../utils.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import Cart from "../models/cartModel.js";

const cartRouter = express.Router();

// create
cartRouter.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
cartRouter.put(
  "/:id",
  verifyTokenAndAuthorization,
  expressAsyncHandler(async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// // delete
cartRouter.delete(
  "/:id",
  verifyTokenAndAuthorization,
  expressAsyncHandler(async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// // get user cart
cartRouter.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  expressAsyncHandler(async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// // get all
cartRouter.get(
  "/",
  verifyTokenAndAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

export default cartRouter;
