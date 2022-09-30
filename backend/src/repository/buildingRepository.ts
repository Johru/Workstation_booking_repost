import { UpdateResult } from 'typeorm';
import { BuildingEntity } from '../db';
import { appDataSource } from '../db';
import { Success } from './success';

export interface IBuildingRepository {
  listCities(): Promise<BuildingEntity[]>;
  listBuildings(): Promise<BuildingEntity[]>;
  singleBuilding(buildingId: number): Promise<BuildingEntity | null>;
  addNewBuilding(body: BuildingEntity): Promise<BuildingEntity>;
  updateBuilding(body: BuildingEntity, id: number): Promise<UpdateResult>;
  deleteBuilding(id: number): Promise<Success>;
}

export class BuildingRepository implements IBuildingRepository {
  async listCities(): Promise<BuildingEntity[]> {
    return appDataSource
      .getRepository(BuildingEntity)
      .createQueryBuilder('building')
      .select(['building.building_city'])
      .distinctOn(['building.building_city'])
      .orderBy('building.building_city')
      .getMany();
  }

  async listBuildings(): Promise<BuildingEntity[]> {
    return appDataSource
      .getRepository(BuildingEntity)
      .createQueryBuilder('building')
      .getMany();
  }
  async singleBuilding(buildingId: number): Promise<BuildingEntity | null> {
    return appDataSource
      .getRepository(BuildingEntity)
      .findOneBy({ building_id: buildingId });
  }

  async addNewBuilding(body: BuildingEntity): Promise<BuildingEntity> {
    const resSave = new BuildingEntity();
    resSave.building_name = body.building_name;
    resSave.building_address = body.building_address;
    resSave.building_zip = body.building_zip;
    resSave.building_city = body.building_city;
    resSave.building_country = body.building_country;
    resSave.building_image = body.building_image;

    return appDataSource.getRepository(BuildingEntity).save(resSave);
  }

  async updateBuilding(
    body: BuildingEntity,
    id: number
  ): Promise<UpdateResult> {
    return appDataSource.getRepository(BuildingEntity).update(id, {
      building_name: body.building_name,
      building_address: body.building_address,
      building_zip: body.building_zip,
      building_city: body.building_city,
      building_image: body.building_image,
    });
  }
  async deleteBuilding(id: number): Promise<Success> {
    const deletion = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(BuildingEntity)
      .where('building_id=:buildingId', {
        buildingId: id,
      })
      .execute();

    if (deletion.affected == 0) {
      return { success: 'no' };
    } else {
      return { success: 'yes' };
    }
  }
}
