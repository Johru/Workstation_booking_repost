import express from 'express';

import { reservationRouter } from './route/reservationRoute';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';
import { buildingRouter } from './route/buildingRoute';

const app = express();

app.use(requestLogger);

app.use(express.json());
app.use(reservationRouter);
app.use(buildingRouter);
// app.use(router);

app.use(errorLogger);

export default app;
