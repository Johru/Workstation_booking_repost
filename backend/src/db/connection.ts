import { DataSource } from 'typeorm';
import config from '../config';
import { SeatEntity } from './entity/seatEntity';
import { ReservationEntity } from './entity/reservationEntity';
import { UserEntity } from './entity/userEntity';
import { WorkstationEntity } from './entity/workstationEntity';
import { BuildingEntity } from './entity/buildingEntity';
import { FloorEntity } from './entity/floorEntity';
import logger from '../logger';


export const appDataSource = new DataSource({
  type: 'mysql',
  host: config.mysql.host,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    logger.info('Data source has been initialized.');
  })
  .catch(error => {
    logger.info(`Error during Data Source initialization: ${error}`);
  });
