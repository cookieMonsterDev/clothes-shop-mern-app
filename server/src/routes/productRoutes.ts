import express from 'express';
import { verifyTokenAndAdmin } from '../controls/middleware/authMiddleware';
import {
  createProductControl,
  deleteProductControl,
  getAllProductsControl,
  getProductControl,
  updateProductControl,
} from '../controls/productControls';

const productRouter = express.Router();

productRouter
  .route('/products/')
  .post(verifyTokenAndAdmin, createProductControl);
productRouter
  .route('/products/:id')
  .put(verifyTokenAndAdmin, updateProductControl);
productRouter
  .route('/products/:id')
  .delete(verifyTokenAndAdmin, deleteProductControl);

productRouter.route('/products/:id').get(getProductControl);
productRouter.route('/products/').get(getAllProductsControl);

export default productRouter;
