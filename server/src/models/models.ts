import { model } from 'mongoose';
import CartSchema from './schemas/Cart';
import OrderSchema from './schemas/Order';
import ProductSchema from './schemas/Product';
import UserSchema from './schemas/User';

export const userModel = model('User', UserSchema);
export const productModel = model('Product', ProductSchema);
export const cartModel = model('Cart', CartSchema);
export const orderModel = model('Order', OrderSchema);
