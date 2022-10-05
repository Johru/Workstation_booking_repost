import { appDataSource } from '../db';
import { FloorEntity } from '../db';
import { Response, Request } from 'express';
import { Success } from './success';

export interface IFloorRepository {
  findAllFloors(): Promise<FloorEntity[]>;
  saveFloor(floor: FloorEntity): Promise<FloorEntity>;
  updateFloor(floorId: number, floor: FloorEntity): Promise<FloorEntity>;
  deleteFloor(floorId: number): Promise<Success>;
}

export class FloorRepository implements IFloorRepository {
  async findAllFloors(): Promise<FloorEntity[]> {
    return appDataSource.getRepository(FloorEntity).find();
  }

  async saveFloor(floor: FloorEntity): Promise<FloorEntity> {
    const floorToSave = new FloorEntity();
    floorToSave.building_id = floor.building_id;
    floorToSave.floor_name = floor.floor_name;
    floorToSave.floor_capacity = floor.floor_capacity;
    floorToSave.floor_plan = floor.floor_plan;

    return appDataSource.getRepository(FloorEntity).save(floorToSave);
  }

  async updateFloor(floorId: number, floor: FloorEntity): Promise<FloorEntity> {
    var floorUpdate = await appDataSource.getRepository(FloorEntity).findOne({
      where: {
        floor_id: floorId,
      },
    });

    if (floorUpdate == null) {
      let err = new Error();
      err.message = 'Record not found.';
      return Promise.reject(err);
    } else {
      floorUpdate.building_id = floor.building_id;
      floorUpdate.floor_name = floor.floor_name;
      floorUpdate.floor_capacity = floor.floor_capacity;
      floorUpdate.floor_plan = floor.floor_plan;
      return appDataSource.getRepository(FloorEntity).save(floorUpdate);
    }
  }
  async deleteFloor(floorId: number): Promise<Success> {
    var floorRemove = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(FloorEntity)
      .where('floor_id =:floorId', { floorId: floorId })
      .execute();

    if (floorRemove.affected == 0) {
      return { success: 'yes' };
    } else {
      return { success: 'no' };
    }
  }
}
