import mysql from 'mysql';
import { DataSource } from 'typeorm';
import { WorkstationEntity } from './models/workstationEntity';
// import { Todo } from './models/todo';
import config from '../config';
import { SeatTable } from './models/seat';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  port: Number.parseInt(config.mysql.port!),
  username: config.mysql.user,
  password: config.mysql.password,
  database: process.env.DB_DATABASE,
  entities: [WorkstationTable, SeatTable],
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
