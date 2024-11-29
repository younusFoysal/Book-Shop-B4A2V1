import { Book } from './book.interface';
import { Schema, model } from "mongoose";


const BookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: ["Fiction" , "Science" , "SelfDevelopment" , "Poetry" , "Religious"],
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'InStock status is required'],
    },
  },
  { timestamps: true, versionKey: false }
);


export const BookModel = model<Book>('Book', BookSchema);