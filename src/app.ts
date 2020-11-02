import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { json } from 'body-parser';
import { defaultErrorHandler } from './middlewares/default-error-handler';
import { indexUserRouter } from './routes/user/index';
import { NewUserRouter } from './routes/user/new';

config();
const app = express();
app.use(cors());
app.use(helmet());
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use(json());
app.use(indexUserRouter);
app.use(NewUserRouter);
app.all('*', async (_, res) => {
  res.status(404).send({
    message: 'Not Found!',
  });
});
app.use(defaultErrorHandler);

export { app };
