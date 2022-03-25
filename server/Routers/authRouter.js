import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// Register
// authRouter.post(
//   "/register",
//   expressAsyncHandler(async (req, res) => {
//     const user = User({
//       username: req.body.username,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 8),
//     });
//     const createdUser = await user.save();
//     res.status(201).send({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//   })
// );

authRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const createdUser = await user.save();
      const { password, updatedAt, ...others } = createdUser._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

// login
authRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      } else {
        res.status(401).json("wrong credentials!");
      }
    } else {
      res.status(401).send({ message: "Invalid username or password" });
    }
  })
);

export default authRouter;
