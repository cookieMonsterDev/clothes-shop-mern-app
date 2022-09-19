import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  createOrderService,
  deleteOrderService,
  getAllOrdersService,
  getOrderService,
  updateOrderService,
} from "./services/orderServices";

export const createOrderControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const cart = await createOrderService(req.body);
    res.status(201).json(cart);
  }
);

export const updateOrderControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const cart = await updateOrderService(req.params.id, req.body);
    res.status(201).json(cart);
  }
);

export const deleteOrderControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    await deleteOrderService(req.params.id);
    res.status(201).json({ message: `Order ${req.params.id} is deleted` });
  }
);

export const getOrderControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const cart = await getOrderService(req.params.userId);
    res.status(201).json(cart);
  }
);

export const getAllOrdersControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const carts = await getAllOrdersService();
    res.status(201).json(carts);
  }
);
