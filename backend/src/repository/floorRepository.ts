import { appDataSource } from '../db';
import { FloorTable } from '../db';
import { Response, Request } from 'express';

export interface IFloorRepository {
  findAllFloors(): Promise<FloorTable[]>;
  saveFloor(floor: FloorTable): Promise<FloorTable>;
  updateFloor(id: number, floor:FloorTable): Promise<FloorTable>;
  deleteFloor(id: number):Promise<FloorTable[]>;

}

export class FloorRepository implements IFloorRepository {
  async findAllFloors(): Promise<FloorTable[]> {
    return appDataSource.getRepository(FloorTable).find();
  }

  async saveFloor(floor: FloorTable): Promise<FloorTable> {
    const floorToSave = new FloorTable();
    floorToSave.building_id = floor.building_id;
    floorToSave.floor_name = floor.floor_name;
    floorToSave.floor_capacity = floor.floor_capacity;
    floorToSave.floor_plan = floor.floor_plan;

    return appDataSource.getRepository(FloorTable).save(floorToSave);
  }

  async updateFloor(id: number, floor: FloorTable): Promise<FloorTable> {
    var floorUpdate = await appDataSource.getRepository(FloorTable).find({
        where: {
          floor_id: id,
        },
      });
      var floorToSave: FloorTable = {};
      floorUpdate.map(v => {
        floorToSave = v;
      });
      floorToSave.building_id = floor.building_id;
      floorToSave.floor_name = floor.floor_name;
      floorToSave.floor_capacity = floor.floor_capacity;
      floorToSave.floor_plan = floor.floor_plan;
     
      return appDataSource.getRepository(FloorTable).save(floorToSave);
  }

  async deleteFloor(id: number): Promise<FloorTable[]> {
    var floorRemove = await appDataSource.getRepository(FloorTable).find({
      where: {
        floor_id: id,
      },
    });
    return appDataSource.getRepository(FloorTable).remove(floorRemove)

  }
}
