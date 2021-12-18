/// <reference types="@sveltejs/kit" />
type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

type UserCred = {
  id: number;
  userId: number;
  password: string;
  updatedAt:Date;
};

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  menuId: number;
  orderId: number;
};

type MenuItem = {
  id: number;
  name: string;
  category: string;
  unitPrice: number;
  restaurantId: number;
};

type Restaurant = {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
};

type Valet = {
  id: number;
  name: string;
  contactNo: string;
  averageRating: number;
};

type Order = {
  id: number;
  userId: number;
  valetId: number;
  paymentId: string;
  status: string;
  createdAt: Date;
  serviceCharge: number;
  gst: number;
  total: number;
  discountApplied: number;
  deliveredAt: Date;
};

type Payment = {
    id: string;
    type: string;
}
