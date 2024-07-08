import 'dotenv/config';

import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';

import { DB_ADDRESS } from './config';
import errorHandler from './middlewares/error-handler';
import routes from './routes';

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`API server started at port ${PORT}`));
