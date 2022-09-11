import express from 'express';
import { router } from './route/todoRoute';

const app = express();

app.use(express.json());
app.use(router);

export default app;
