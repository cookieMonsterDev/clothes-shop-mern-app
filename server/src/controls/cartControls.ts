import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  createCartService,
  deleteCartService,
  getAllCartsService,
  getCartService,
  updateCartService,
} from './services/cartServices';

export const createCartControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const cart = await createCartService(req.body);
    res.status(201).json(cart);
  }
);

export const updateCartControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const cart = await updateCartService(req.params.id, req.body);
    res.status(201).json(cart);
  }
);

export const deleteCartControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    await deleteCartService(req.params.id);
    res.status(201).json({ message: `Cart ${req.params.id} is deleted` });
  }
);

export const getCartControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const cart = await getCartService(req.params.userId);
    res.status(201).json(cart);
  }
);

export const getAllCartsControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const carts = await getAllCartsService();
    res.status(201).json(carts);
  }
);
