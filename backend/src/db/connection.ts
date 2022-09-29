import { DataSource } from 'typeorm';
import config from '../config';
import { BuildingEntity } from './entity/buildingEntity';
import { FloorTable } from './entity/floor';
import { ReservationTable } from './entity/reservation';
import { SeatTable } from './entity/seat';
import { UserTable } from './entity/user';
import { WorkstationTable } from './entity/workstation';

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
    BuildingEntity,
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
