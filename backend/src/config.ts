import { config } from 'dotenv';

config();

export default {
  port: process.env.SERVER_POST,
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABSE,
    port: process.env.DB_PORT,
  },
};
