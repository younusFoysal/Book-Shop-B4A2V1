import { Book } from './book.interface';
import { BookModel } from './book.model';


const createBookIntoDB = async (bookdata: Book) => {
  const result =  await BookModel.create(bookdata);
  return result;
};

const getAllBookFromDB = async (searchTerm: string | undefined | null | Record<never, string>) => {
  let filter = {};
  if (searchTerm) {
    filter = {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }
  const result = await BookModel.find(filter);
  return result;
};

const getSingleBookFromDB = async (productId: string) => {
  try {
    const book = await BookModel.findById(productId);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  } catch (error) {
    throw error;
  }
};

const updateBookInDB = async (productId: string, updateData: Record<string, any>) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      throw new Error('Book not found');
    }
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

const deleteBookFromDB = async (productId: string) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(productId);
    if (!deletedBook) {
      throw new Error('Book not found');
    }
    return deletedBook;
  } catch (error) {
    throw error;
  }
};




export const BookServices = {
  createBookIntoDB,
  getAllBookFromDB,
  getSingleBookFromDB,
  updateBookInDB,
  deleteBookFromDB
}