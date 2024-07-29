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
  details: { key: string, value: string, _id: string}[];
  images: string[];
  tages: string[];
  updatedAt: string;
  createdAt: string;
  updated_at: number;
  created_at: number;
}