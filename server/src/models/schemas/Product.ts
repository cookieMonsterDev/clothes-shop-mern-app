import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    disc: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    categories: {
      type: Array,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export default ProductSchema;
