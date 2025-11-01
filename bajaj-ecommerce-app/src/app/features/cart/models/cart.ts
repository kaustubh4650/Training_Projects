export class CartItem {
  productId: string;
  quantity: number;
  price: number;
  product?: any;
}

export class Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
