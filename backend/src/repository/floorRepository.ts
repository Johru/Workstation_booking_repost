import { appDataSource, BuildingEntity } from '../db';
import { FloorEntity } from '../db';
import { Success } from './success';

export interface IFloorRepository {
  findAllFloors(): Promise<FloorEntity[]>;
  findAllFloorInBuilding(buildingId: number): Promise<FloorEntity[]>;
  saveFloor(floor: FloorEntity, building: BuildingEntity): Promise<FloorEntity>;
  updateFloor(floorId: number, floor: FloorEntity): Promise<FloorEntity>;
  deleteFloor(floorId: number): Promise<Success>;
}

export class FloorRepository implements IFloorRepository {
  async findAllFloors(): Promise<FloorEntity[]> {
    return appDataSource.getRepository(FloorEntity).find();
  }

  async findAllFloorInBuilding(buildingId: number): Promise<FloorEntity[]> {
    return appDataSource
      .getRepository(FloorEntity)
      .createQueryBuilder('user')
      .where('floor.buildingBuidingId = :building_id', {
        building_id: buildingId,
      })
      .getRawMany();
  }

  async saveFloor(
    floor: FloorEntity,
    building: BuildingEntity
  ): Promise<FloorEntity> {
    const floorToSave = new FloorEntity();
    floorToSave.building = building;
    floorToSave.floor_name = floor.floor_name;

    return appDataSource.getRepository(FloorEntity).save(floorToSave);
  }

  async updateFloor(floorId: number, floor: FloorEntity): Promise<FloorEntity> {
    const floorUpdate = await appDataSource.getRepository(FloorEntity).findOne({
      where: {
        floor_id: floorId,
      },
    });

    if (floorUpdate == null) {
      throw new Error('Record not found');
    } else {
      await appDataSource
        .createQueryBuilder()
        .update(FloorEntity)
        .set({ floor_name: floor.floor_name })
        .where('floor_id = :id', { id: floor.floor_id })
        .execute();

      return floorUpdate;
    }
  }
  async deleteFloor(floorId: number): Promise<Success> {
    const floorRemove = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(FloorEntity)
      .where('floor_id =:floorId', { floorId: floorId })
      .execute();

    if (floorRemove.affected == 0) {
      return { success: 'no' };
    } else {
      return { success: 'yes' };
    }
  }
}
