import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import HttpErrors from '../controls/errorHandling/httpErrors';

const key = process.env.STRIPE_KEY || 'Your secret key';

const stripe = new Stripe(key, {
  apiVersion: '2022-08-01',
});

const stripeRouter = express.Router();

const stripeControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const payment = stripeService(req.body);
    res.status(201).json(payment);
  }
);

const stripeService = async (body: any) => {
  try {
    const payment = await stripe.charges.create({
      source: body.tokenId,
      amount: body.amount,
      currency: 'usd',
    });

    if(!payment) throw new HttpErrors(`Sth went wrond`, 500);

    return payment;
  } catch(err) {
    throw new HttpErrors(`Sth went wrond: ${err}`, 500);
  }
}

stripeRouter.post('/payment', stripeControl);

export default stripeRouter;