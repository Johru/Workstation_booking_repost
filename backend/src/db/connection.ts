import { DataSource } from 'typeorm';
import config from '../config';
import {
  BuildingEntity,
  SeatEntity,
  ReservationEntity,
  UserEntity,
  FloorEntity,
  WorkstationEntity,
} from './index';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  port: Number.parseInt(config.mysql.port!),
  username: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  entities: [
    BuildingEntity,
    SeatEntity,
    ReservationEntity,
    UserEntity,
    FloorEntity,
    WorkstationEntity,
  ],

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
