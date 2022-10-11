import express from 'express';
import bodyParser from 'body-parser';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';
import { reservationRouter } from './route/reservationRoute';
import { buildingRouter } from './route/buildingRoute';
import { userRouter } from './route/userRoute';
import { authRouter } from './route/userRoute';
import { workstationRouter } from './route/workstationSeatRoute';
import { seatRouter } from './route/workstationSeatRoute';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use(express.json());
app.use(reservationRouter);
app.use(buildingRouter);
app.use(userRouter);
app.use(authRouter);
app.use(workstationRouter);
app.use(seatRouter);

app.use(errorLogger);

export default app;
