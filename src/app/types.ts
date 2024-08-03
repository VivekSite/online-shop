export interface UserType {
  name: string;
  email: string;
  password: string;
}

export interface ProductType {
  _id: string;
  title: string;
  price: number;
  discount: number;
  sellerId: string;
  inStock: boolean;
  about: string[];
  details: { key: string; value: string; _id: string }[];
  images: string[];
  tages: string[];
  updatedAt: string;
  createdAt: string;
  updated_at: number;
  created_at: number;
}

export interface CartDataType {
  _id: string;
  user_id: string;
  products: {
    _id: ProductType;
    quantity: number;
    isSelected: boolean;
  }[];
}

export interface CartWithSubTotal extends CartDataType {
  total: number;
}

export interface OrderType {
  _id: string;
  user_id: string;
  product: ProductType;
  quantity: number;
  shipping_address: string;
  shipping_status: 'pending' | 'complete' | 'cancelled';
  payment_method: 'Pay on Delivery' | 'UPI' | 'Credit Card';
  payment_status: 'pending' | 'complete' | 'cancelled';
  delivered_at: number | null;
  order_summary: {
    Subtotal: number | null;
    Shipping: number | null;
    Cash: number | null;
    Total: number | null;
    Promotion_Applied: number | null;
    GrandTotal: number | null;
  } | null;
  is_cancelled: boolean;
  cancelled_at: number | null;
  updated_at: number | null;
  created_at: number | null;
  updatedAt: string;
  createdAt: string;
}

export interface OrderSummaryType {
  
}
