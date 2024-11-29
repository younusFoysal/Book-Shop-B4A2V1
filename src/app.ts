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

const gethome = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Book Server is Running...',
  });
};

app.get('/', gethome);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Invalid Route',
  });
});

export default app;
