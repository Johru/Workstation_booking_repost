import express from 'express';

import { router } from './route/workstationSeatRoute';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(requestLogger);

app.use(express.json());
app.use(router);

app.use(errorLogger);

export default app;
