import { model, Schema } from 'mongoose';
import { BOrder } from './order.interface';

const OrderSchema = new Schema<BOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please provide a valid email address',
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'books',
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrderModel = model<BOrder>('orders', OrderSchema);
