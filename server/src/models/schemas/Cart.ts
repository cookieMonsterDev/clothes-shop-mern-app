import { Schema } from 'mongoose';

const CardSchema = new Schema(
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
  },
  { timestamps: true }
);

export default CardSchema;
