import mysql from 'mysql';
import { DataSource } from 'typeorm';
import { WorkstationEntity } from './models/workstationEntity';
import config from '../config';
import { SeatEntity } from './models/seatEntity';
import { BuildingEntity } from './models/buildingEntity';
import { FloorEntity } from './models/floorEntity';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  port: Number.parseInt(config.mysql.port!),
  username: config.mysql.user,
  password: config.mysql.password,
  database: process.env.DB_DATABASE,
  entities: [WorkstationEntity, SeatEntity],
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
