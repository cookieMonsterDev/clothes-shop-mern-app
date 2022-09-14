import express from 'express';

const orderRouter = express.Router();

orderRouter.route('/order').get((req, res) => {
  res.send('Order');
});

export default orderRouter;