import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import restaurantRouter from './routes/restaurantRouter';
import usersRouter from './routes/usersRouter';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/restaurants', restaurantRouter);
app.use('/users', usersRouter);

const server = app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`));