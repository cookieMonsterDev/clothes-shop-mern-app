import { orderModel } from "../../models/models";
import HttpErrors from "../errorHandling/httpErrors";
import { OrderTypes } from "./types/orderTypes";

//Create order
export const createOrderService = async (body: OrderTypes): Promise<any> => {
  const newOrder = new orderModel({ ...body });

  try {
    const order = await newOrder.save();
    
  return {order}
  } catch (err) {
    throw new HttpErrors(`Failed to create order: ${err.message}`, 401);
  }
}

//Update order
export const updateOrderService = async (id: string, body: OrderTypes) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );
    if (!order) throw new HttpErrors(`Order not found`, 404);

    return { order };
  } catch (err) {
    throw new HttpErrors(`Failed to update order: ${err.message}`, 401);
  }
}

//Delete order
export const deleteOrderService = async (id: string): Promise<void> => {
  try {
    const order = await orderModel.findByIdAndDelete(id);
    if (!order) throw new HttpErrors(`Order not found`, 404);
    return;
  } catch (err) {
    throw new HttpErrors(`Operation failed: ${err.message}`, 401);
  }
}

//Get user order
export const getOrderService = async (userId: string) => {
  try {
    const orders = await orderModel.findOne({ userid: userId });
    if (!orders) throw new HttpErrors(`Orders not found`, 404);
    return { orders };
  } catch (err) {
    throw new HttpErrors(`Operation failed: ${err.message}`, 401);
  }
}

//Get all orders
export const getAllOrdersService = async () => {
  try {
    const orders = await orderModel.find();
    if (!orders) throw new HttpErrors(`Orders not found`, 404);
    return { orders };
  } catch (err) {
    throw new HttpErrors(`Operation failed: ${err.message}`, 401);
  }
}