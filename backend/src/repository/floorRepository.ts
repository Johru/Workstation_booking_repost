import { appDataSource } from '../db';
import { FloorEntity } from '../db';
import { Response, Request } from 'express';

export interface IFloorRepository {
  findAllFloors(): Promise<FloorEntity[]>;
  saveFloor(floor: FloorEntity): Promise<FloorEntity>;
  updateFloor(floorId: number, floor:FloorEntity): Promise<FloorEntity>;
  deleteFloor(floorId: number):Promise<FloorEntity[]>;

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
    var floorUpdate = await appDataSource.getRepository(FloorEntity).find({
        where: {
          floor_id: floorId,
        },
      });
      var floorToSave: FloorEntity = {};
      floorUpdate.map(v => {
        floorToSave = v;
      });
      floorToSave.building_id = floor.building_id;
      floorToSave.floor_name = floor.floor_name;
      floorToSave.floor_capacity = floor.floor_capacity;
      floorToSave.floor_plan = floor.floor_plan;
     
      return appDataSource.getRepository(FloorEntity).save(floorToSave);
  }

  async deleteFloor(floorId: number): Promise<FloorEntity[]> {
    var floorRemove = await appDataSource.getRepository(FloorEntity).find({
      where: {
        floor_id: floorId,
      },
    });
    return appDataSource.getRepository(FloorEntity).remove(floorRemove)

  }
}
