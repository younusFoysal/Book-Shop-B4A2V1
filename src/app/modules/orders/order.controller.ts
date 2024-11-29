import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { BookModel } from '../Products/book.model';


const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    const productdata = await BookModel.findById(product);
    // console.log(productdata);
    if (!productdata) {
      return res.status(404).json({
        message: 'Book is not found',
        status: false,
      });
    }

    if (quantity > productdata.quantity) {
      return res.status(404).json({
        message: 'Insufficient stock available',
        status: false,
      });
    }

    const order = await OrderServices.createOrderInDB(email, product, quantity, totalPrice);

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Something went wrong',
      status: false,
      error: err,
    });
  }
};


const CalculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.TotalRevuneInDb();
    const totalRevenue = result[0].totalAmount;
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message ,
      success: false,
      error: {
        name: err.name ,
        errors: err.errors,
      },
      stack: err.stack,
    });
  }
};




export const OrderControllers = {
  createOrder,
  CalculateRevenue
}
