import express from 'express';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';
import { reservationRouter } from './route/reservationRoute';
import { buildingRouter } from './route/buildingRoute';
import { userRouter } from './route/userRoute';

const app = express();

app.use(requestLogger);

app.use(express.json());
app.use(reservationRouter);
app.use(buildingRouter);
app.use(userRouter);

app.use(errorLogger);

export default app;
