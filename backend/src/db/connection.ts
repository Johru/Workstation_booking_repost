import mysql from 'mysql';
import { DataSource } from 'typeorm';

import { Todo } from './models/todo';
import config from '../config';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  port: Number.parseInt(config.mysql.port!),
  username: config.mysql.user,
  password: config.mysql.password,
  database: process.env.DB_DATABASE,
  entities: [Todo],
  logging: false,
  synchronize: true,
});

appDataSource
  .initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Data source has been initialized.');
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error(`Error during Data Source initialization: ${error}`);
  });

const pool = mysql.createPool({
  connectionLimit: 2,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

export const db = {
  query(query: string, values?: Array<unknown>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, result, fields) => {
        if (error) {
          reject(error);
          return;
        } else {
          return resolve({ result, fields });
        }
      });
    });
  },
};
