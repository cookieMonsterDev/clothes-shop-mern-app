import { model } from 'mongoose';
import CardSchema from './schemas/Cart';
import OrderSchema from './schemas/Order';
import ProductSchema from './schemas/Product';
import UserSchema from './schemas/User';

export const userModel = model('User', UserSchema);
export const productModel = model('Product', ProductSchema);
export const cardModel = model('Card', CardSchema);
export const orderModel = model('Order', OrderSchema);
