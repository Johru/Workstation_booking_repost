import express from 'express';
import { floorRouter } from './route/floorRoute';
import bodyParser from 'body-parser';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';
import { reservationRouter } from './route/reservationRoute';
import { buildingRouter } from './route/buildingRoute';
import { userRouter } from './route/userRoute';
import { authRouter } from './route/userRoute';
import { workstationRouter } from './route/workstationSeatRoute';
import { seatRouter } from './route/workstationSeatRoute';
import cors from 'cors';

const allowedDomains = ['http://localhost:4200', 'http://localhost:8080'];

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);
      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use(reservationRouter);
app.use(buildingRouter);
app.use(userRouter);
app.use(authRouter);
app.use(workstationRouter);
app.use(seatRouter);
app.use(floorRouter);

app.use(errorLogger);

export default app;
