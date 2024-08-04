export interface UserType {
  name: string;
  email: string;
  password: string;
}

export interface UserModelType {
  name: string;
  email: string;
  country: string;
  mobile: string;
  profileImage: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  isDeleted: boolean;
  updated_at: number;
  created_at: number;
  updatedAt: string;
  createdAt: string;
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
    product: ProductType;
    quantity: number;
    isSelected: boolean;
  }[];
}

export interface CartWithSubTotal extends CartDataType {
  total: number;
}

export interface AddressType {
  _id: string;
  user_id: string;
  full_name: string;
  mobile_number: string;
  country: string;
  state: string;
  city: string;
  pin_code: string;
  landmark: string;
  address: string;
  is_default: boolean;
  updated_at: number;
  created_at: number;
  updatedAt: string;
  createdAt: string;
}

export interface OrderType {
  _id: string;
  user_id: string;
  product: ProductType;
  quantity: number;
  shipping_address: AddressType;
  shipping_status: 'pending' | 'complete' | 'cancelled';
  payment_method: 'Pay on Delivery' | 'UPI' | 'Credit Card';
  payment_status: 'pending' | 'complete' | 'cancelled';
  delivered_at: number | null;
  order_summary: {
    Subtotal: number | null;
    Shipping: number | null;
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
