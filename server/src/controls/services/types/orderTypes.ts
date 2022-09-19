export interface OrderTypes {
  userid?: string;
  products?: [
    {
      productId?: string;
      quantity?: number;
    }
  ];
  amount?: number;
  address?: any;
  status?: string;
}
