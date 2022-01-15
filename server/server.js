import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routers from "./Routers/routers.js";
import userRouter from "./Routers/userRouter.js";
import productRouter from "./Routers/productRouter.js";
import orderRouter from "./Routers/orderRouter.js";
import authRouter from "./Routers/authRouter.js";
import cartRouter from "./Routers/cartRouter.js";

dotenv.config();
//app config
const app = express();
const port = process.env.PORT || 9000;

//mongodb connection
const connection_url = "mongodb://localhost/swiftshop";
mongoose.connect(connection_url, {
  useNewurlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connected");
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

//routers
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use(routers);
app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
