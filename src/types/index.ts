export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  weight: string;
  price: number;
  discount: number; // percentage (e.g. 10 for 10% off)
  rating: number; // e.g. 4.8
  orders: string; // e.g. "500+"
  image: string;
  stock: number;
  badge: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  area: string;
  paymentMethod: "COD";
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
}
