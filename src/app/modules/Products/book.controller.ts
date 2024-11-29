import { Request, Response } from 'express';
import { BookServices } from './book.service';
import config from '../../config';


const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    // stoer book data into DB
    const result = await BookServices.createBookIntoDB(bookData);

    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Something went wrong',
      success: false,
      error: {
        name: err.name || 'Something went wrong',
        errors: err.errors,
      },
      stack: config.nodeEnv ? err.stack : undefined,
    });
  }
};


const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const books = await BookServices.getAllBookFromDB(searchTerm)

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (err: any) {
    // console.error('Error fetching books:', err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message || err,
      stack: config.nodeEnv ? err.stack : undefined,
    });
  }
};

const getSingleBook = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.productId;

    // retrieve the bookdata
    const book = await BookServices.getSingleBookFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (err: any) {
    // console.error('Error retrieving book:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to retrieve the book',
      stack: config.nodeEnv ? err.stack : undefined,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.productId;
    const updateData = req.body;
    const updatedBook = await BookServices.updateBookInDB(productId, updateData);

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (err: any) {
    // console.error('Error updating book:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to update the book',
      error: config.nodeEnv ? err.stack : undefined,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.productId;
    await BookServices.deleteBookFromDB(bookId);

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: {},
    });
  } catch (err: any) {
    // console.error('Error deleting book:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to delete the book',
      error: config.nodeEnv ? err.stack : undefined,
    });
  }
};


export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
}