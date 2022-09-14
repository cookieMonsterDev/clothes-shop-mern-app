import express from 'express';

const productRouter = express.Router();

productRouter.route('/product').get((req, res) => {
  res.send('Products');
});

export default productRouter;