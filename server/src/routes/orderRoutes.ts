import express from 'express';
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenG,
} from '../controls/middleware/authMiddleware';
import {
  createOrderControl,
  deleteOrderControl,
  getAllOrdersControl,
  getOrderControl,
  updateOrderControl,
} from '../controls/orderControls';

const orderRouter = express.Router();

orderRouter.route('/order').post(verifyTokenG, createOrderControl);

orderRouter.route('/order/:id').put(verifyTokenAndAdmin, updateOrderControl);

orderRouter.route('/order/:id').delete(verifyTokenAndAdmin, deleteOrderControl);

orderRouter
  .route('/order/:userId')
  .get(verifyTokenAndAuthorization, getOrderControl);

orderRouter.route('/order/').get(verifyTokenAndAdmin, getAllOrdersControl);

export default orderRouter;
