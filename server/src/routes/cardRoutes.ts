import express from 'express';

const cardRouter = express.Router();

cardRouter.route('/card').get((req, res) => {
  res.send('Card');
});

export default cardRouter;