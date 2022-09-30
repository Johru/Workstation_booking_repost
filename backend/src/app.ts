import express from 'express';
<<<<<<< HEAD

=======
>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a
import { reservationRouter } from './route/reservationRoute';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';
import { buildingRouter } from './route/buildingRoute';
import { userRouter } from './route/userRoute';

const app = express();

app.use(requestLogger);

app.use(express.json());
app.use(reservationRouter);
<<<<<<< HEAD
app.use(buildingRouter);
app.use(userRouter);
// app.use(router);
=======
>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a

app.use(errorLogger);

export default app;
