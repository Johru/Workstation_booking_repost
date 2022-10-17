import { config } from 'dotenv';
import { join } from 'path';

const envPath = join(__dirname, '../.env');

config({path: envPath});

export default {
  port: process.env.SERVER_PORT,
  secret: process.env.TOKEN_SECRET,
  tokenExpiry: process.env.TOKEN_EXPIRY,
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
};
