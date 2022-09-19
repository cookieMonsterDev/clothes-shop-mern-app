import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductService,
  updateProductService,
} from './services/productServices';

//Only admin
export const createProductControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const product = await createProductService(req.body);
    res.status(201).json(product);
  }
);

export const updateProductControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const product = await updateProductService(req.params.id, req.body);
    res.status(201).json(product);
  }
);

export const deleteProductControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    await deleteProductService(req.params.id);
    res.status(201).json({ message: `Product ${req.params.id} is deleted` });
  }
);

//All
export const getProductControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const product = await getProductService(req.params.id);
    res.status(201).json(product);
  }
);

export const getAllProductsControl = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query.category?.toString();
    const product = await getAllProductsService(query!);
    res.status(201).json(product);
  }
);
