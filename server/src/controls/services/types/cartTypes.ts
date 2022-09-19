export interface CartTypes {
  userid: string;
  products: [
    {
      productId: string;
      quantity: number;
    }
  ],
}