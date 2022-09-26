import { DataSource } from 'typeorm';
import config from '../config';
import { BuildingTable } from './models/building';
import { FloorTable } from './models/floor';
import { ReservationTable } from './models/reservation';
import { SeatTable } from './models/seat';
import { UserTable } from './models/user';
import { WorkstationTable } from './models/workstation';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  port: Number.parseInt(config.mysql.port!),
  username: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  entities: [
    SeatTable,
    ReservationTable,
    UserTable,
    BuildingTable,
    FloorTable,
    WorkstationTable,
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
