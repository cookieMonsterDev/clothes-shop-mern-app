import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userid: {
      type: String,
      require: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      require: true,
    },
    address: {
      type: Object,
      require: true,
    },
    status: {
      type: String,
      default: 'PANDING',
    },
  },
  { timestamps: true }
);

export default OrderSchema;
