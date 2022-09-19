import express from "express";
import {
  createCartControl,
  deleteCartControl,
  getAllCartsControl,
  getCartControl,
  updateCartControl,
} from "../controls/cartControls";
import {
  verifyTokenG,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../controls/middleware/authMiddleware";

const cartRouter = express.Router();

cartRouter.route("/cart").post(verifyTokenG, createCartControl);

cartRouter
  .route("/cart/:id")
  .put(verifyTokenAndAuthorization, updateCartControl);

cartRouter
  .route("/cart/:id")
  .delete(verifyTokenAndAuthorization, deleteCartControl);

cartRouter
  .route("/cart/:userId")
  .get(verifyTokenAndAuthorization, getCartControl);

cartRouter.route("/cart/").get(verifyTokenAndAdmin, getAllCartsControl);

export default cartRouter;
