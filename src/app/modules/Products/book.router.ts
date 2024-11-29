import express from "express";
import { BookControllers } from './book.controller';

const router = express.Router();

router.post("/products", BookControllers.createBook);
router.get('/products', BookControllers.getAllBooks);
router.get('/products/:productId', BookControllers.getSingleBook);
router.put('/products/:productId', BookControllers.updateBook);
router.delete('/products/:productId', BookControllers.deleteBook);


export const BookRoutes =  router;