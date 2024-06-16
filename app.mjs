import express from 'express';
import morgan from 'morgan';
import AppError from './utils/appError.mjs';
import globalErrorHandler from './controllers/errorController.mjs';

const app = express();

import geminiRouter from './routers/geminiRouter.mjs';

app.use(express.json({ limit: '10kb' }));

app.use(morgan('dev'));

app.use('/api/v1/gemini', geminiRouter);

app.all('/api/v1/*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} in this server`, 404));
});

app.use(globalErrorHandler);

export default app;
