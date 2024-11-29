import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { BookRoutes } from './app/modules/Products/book.router';
import { OrderRoutes } from './app/modules/orders/order.router';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', BookRoutes);
app.use('/api', OrderRoutes)

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
