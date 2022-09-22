import { appDataSource } from '../db';
import { Floor } from '../db';
import { Response, Request } from 'express';

export interface IFloorRepository {
  findAllFloors(): Promise<Floor[]>;
  saveFloor(floor: Floor): Promise<Floor>;
  updateFloor(id: number, floor:Floor): Promise<Floor>;
  deleteFloor(id: number):Promise<Floor[]>;

}

export class FloorRepository implements IFloorRepository {
  async findAllFloors(): Promise<Floor[]> {
    return appDataSource.getRepository(Floor).find();
  }

  async saveFloor(floor: Floor): Promise<Floor> {
    const floorToSave = new Floor();
    floorToSave.building_id = floor.building_id;
    floorToSave.floor_name = floor.floor_name;
    floorToSave.floor_capacity = floor.floor_capacity;
    floorToSave.floor_plan = floor.floor_plan;

    return appDataSource.getRepository(Floor).save(floorToSave);
  }

  async updateFloor(id: number, floor: Floor): Promise<Floor> {
    var floorUpdate = await appDataSource.getRepository(Floor).find({
        where: {
          floor_id: id,
        },
      });
      var floorToSave: Floor = {};
      floorUpdate.map(v => {
        floorToSave = v;
      });
      floorToSave.building_id = floor.building_id;
      floorToSave.floor_name = floor.floor_name;
      floorToSave.floor_capacity = floor.floor_capacity;
      floorToSave.floor_plan = floor.floor_plan;
     
      return appDataSource.getRepository(Floor).save(floorToSave);
  }

  async deleteFloor(id: number): Promise<Floor[]> {
    var floorRemove = await appDataSource.getRepository(Floor).find({
      where: {
        floor_id: id,
      },
    });
    return appDataSource.getRepository(Floor).remove(floorRemove)

  }
}
