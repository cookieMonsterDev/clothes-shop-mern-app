import { productModel } from '../../models/models';
import HttpErrors from '../errorHandling/httpErrors';
import { ProductTypes } from './types/productTypes';

// Create product
export const createProductService = async (
  body: ProductTypes
): Promise<ProductTypes> => {
  const newProduct = new productModel({ ...body });

  try {
    const product = await newProduct.save();

    return {
      id: product.id,
      title: product.title,
      disc: product.disc,
      img: product.img,
      categories: product.categories,
      size: product.size,
      color: product.color,
      price: product.price,
    };
  } catch (err) {
    throw new HttpErrors(`Failed to create product: ${err.message}`, 401);
  }
};

// Update product
export const updateProductService = async (
  id: string,
  body: ProductTypes
): Promise<ProductTypes> => {
  try {
    const product = await productModel.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    if (!product) throw new HttpErrors(`Product not found`, 404);

    return {
      id: product.id,
      title: product.title,
      disc: product.disc,
      img: product.img,
      categories: product.categories,
      size: product.size,
      color: product.color,
      price: product.price,
    };
  } catch (err) {
    throw new HttpErrors(`Failed to update product: ${err.message}`, 401);
  }
};

// Delete product
export const deleteProductService = async (id: string): Promise<void> => {
  try {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) throw new HttpErrors(`Product not found`, 404);

    return;
  } catch (err) {
    throw new HttpErrors(`Failed to delete product: ${err.message}`, 401);
  }
};

//Get product
export const getProductService = async (id: string): Promise<ProductTypes> => {
  try {
    const product = await productModel.findById(id);
    if (!product) throw new HttpErrors(`Product not found`, 404);

    return {
      id: product.id,
      title: product.title,
      disc: product.disc,
      img: product.img,
      categories: product.categories,
      size: product.size,
      color: product.color,
      price: product.price,
    };
  } catch (err) {
    throw new HttpErrors(`Operation failed: ${err.message}`, 401);
  }
};

//Get all products
export const getAllProductsService = async (
  query?: string
): Promise<ProductTypes[]> => {
  try {
    let products;

    !query
      ? (products = await productModel.find())
      : (products = await productModel.find({
          categories: {
            $in: [query],
          },
        }));

    if (!products) throw new HttpErrors(`Product not found`, 404);

    let newArr: ProductTypes[] = products.map((item) => {
      return {
        id: item.id,
        title: item.title,
        disc: item.disc,
        img: item.img,
        categories: item.categories,
        size: item.size,
        color: item.color,
        price: item.price,
      };
    });

    return newArr;
  } catch (err) {
    throw new HttpErrors(`Failed to delete product: ${err.message}`, 401);
  }
};
