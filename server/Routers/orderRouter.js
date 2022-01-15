import express from "express";
import data from "../data.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { generateToken, isAuth } from "../utils.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

// create
orderRouter.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
orderRouter.put(
  "/:id",
  verifyTokenAndAdmin,
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
orderRouter.delete(
  "/:id",
  verifyTokenAndAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// // get user orders
orderRouter.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// // get all
orderRouter.get(
  "/",
  verifyTokenAndAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// get monthly income
orderRouter.get(
  "/income",
  verifyTokenAndAdmin,
  expressAsyncHandler(async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(date.lastMonth - 1));
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

export default orderRouter;
