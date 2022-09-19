import { cartModel } from '../../models/models';
import HttpErrors from '../errorHandling/httpErrors';
import { CartTypes } from './types/cartTypes';

//Create cart
export const createCartService = async (body: CartTypes) => {
  const newCart = new cartModel({ ...body });

  try {
    const cart = await newCart.save();
    return { cart };
  } catch (err) {
    throw new HttpErrors(`Failed to create cart: ${err.message}`, 401);
  }
};

//Update cart
export const updateCartService = async (id: string, body: CartTypes) => {
  try {
    const cart = await cartModel.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );
    if (!cart) throw new HttpErrors(`Cart not found`, 404);

    return { cart };
  } catch (err) {
    throw new HttpErrors(`Failed to create cart: ${err.message}`, 401);
  }
};

//Delete cart
export const deleteCartService = async (id: string): Promise<void> => {
  try {
    const cart = await cartModel.findByIdAndDelete(id);
    if (!cart) throw new HttpErrors(`Cart not found`, 404);
    return;
  } catch (err) {
    throw new HttpErrors(`Operation failed: ${err.message}`, 401);
  }
};

//Get user cart
export const getCartService = async (userId: string) => {
  try {
    const carts = await cartModel.findOne({ userid: userId });
    if (!carts) throw new HttpErrors(`Cart not found`, 404);
    return { carts };
  } catch (err) {
    throw new HttpErrors(`Operation failed: ${err.message}`, 401);
  }
};

//Get all cart
export const getAllCartsService = async () => {
  try {
    const carts = await cartModel.find();
    if (!carts) throw new HttpErrors(`Carts not found`, 404);
    return { carts };
  } catch (err) {
    throw new HttpErrors(`Operation failed: ${err.message}`, 401);
  }
};
