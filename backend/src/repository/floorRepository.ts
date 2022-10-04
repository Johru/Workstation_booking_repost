import { appDataSource } from '../db';
import { FloorEntity } from '../db';
import { Response, Request } from 'express';
import { Success } from './success';

export interface IFloorRepository {
  findAllFloors(): Promise<FloorEntity[]>;
  saveFloor(floor: FloorEntity): Promise<FloorEntity>;
  updateFloor(floorId: number, floor: FloorEntity): Promise<FloorEntity>;
  deleteFloor(req: Request, res: Response): Promise<Success>;
  countWorkstationAndSeat (): Promise <any[]>;
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
    var floorToSave: FloorEntity = {
      floor_id: 0,
    };
    floorUpdate.map(v => {
      floorToSave = v;
    });
    floorToSave.building_id = floor.building_id;
    floorToSave.floor_name = floor.floor_name;
    floorToSave.floor_capacity = floor.floor_capacity;
    floorToSave.floor_plan = floor.floor_plan;

    return appDataSource.getRepository(FloorEntity).save(floorToSave);
  }

  async deleteFloor(req: Request, res: Response): Promise<Success> {
    var floorId = parseInt(req.params.floorId, 10);
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


  async countWorkstationAndSeat(): Promise<any[]> {
    
    return appDataSource
    .getRepository(FloorEntity)
    .createQueryBuilder('floor')
    .select([
      'floor.floor_id',
      'floor.floor_name',
      'floor.floor_capacity',
      'floor.floor_plan'
    ])
    .loadRelationCountAndMap('floor.workstationCount', 'floor.workstation')
    .getMany();
}

}
