import express from 'express';

import { router } from './route/floorRoute';
import requestLogger from './middlewares/request-logger';
import errorLogger from './middlewares/error-logger';

const app = express();

app.use(requestLogger);

app.use(express.json());
app.use(router);

app.use(errorLogger);

export default app;
