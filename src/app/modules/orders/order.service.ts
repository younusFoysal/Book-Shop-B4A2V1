import { OrderModel } from './order.model';
import { BookModel } from '../Products/book.model';



const createOrderInDB = async (
  email: string,
  productId: string,
  quantity: number,
  totalPrice: number
) => {

  const product = await BookModel.findById(productId);

  //console.log("ok", product)
  if (!product) {
    throw { statusCode: 404, message: 'Product not found' };
  }

  const updatedQuantity = product.quantity - quantity;
  product.quantity = updatedQuantity;
  product.inStock = updatedQuantity > 0;
  await product.save();

  const order = await OrderModel.create({
    email,
    product: productId,
    quantity,
    totalPrice,
  });
  return order;
};


const TotalRevuneInDb = () => {
  const result = OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ['$totalPrice', '$quantity'] } },
      },
    },
  ]);

  return result;
};




export const OrderServices = {
  createOrderInDB,
  TotalRevuneInDb
}
