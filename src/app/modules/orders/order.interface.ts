import { Schema } from 'mongoose';

export interface BOrder {
  email: string;
  product: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
