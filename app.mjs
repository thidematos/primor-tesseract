import express from 'express';
import morgan from 'morgan';
import AppError from './utils/appError.mjs';
import globalErrorHandler from './controllers/errorController.mjs';
import { v4 as uuidv4 } from 'uuid';

const app = express();

import extractRouter from './routers/extractRouter.mjs';
import semanaRouter from './routers/semanaRouter.mjs';
import ingredienteRouter from './routers/ingredienteRouter.mjs';
import produtoRouter from './routers/produtoRouter.mjs';
import authRouter from './routers/authRouter.mjs';
import cookieParser from 'cookie-parser';

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(morgan('dev'));

app.use((req, res, next) => {
  req.id = uuidv4();

  next();
});

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/extract', extractRouter);

app.use('/api/v1/semanas', semanaRouter);

app.use('/api/v1/ingredientes', ingredienteRouter);

app.use('/api/v1/produtos', produtoRouter);

app.all('/api/v1/*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} in this server`, 404));
});

app.use(globalErrorHandler);

export default app;
