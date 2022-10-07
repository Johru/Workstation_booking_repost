import { config } from 'dotenv';
const dirpath = require('path');
const envpath = dirpath.join(__dirname, '../.env');

config();

export default {
  port: process.env.SERVER_PORT,
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
};
