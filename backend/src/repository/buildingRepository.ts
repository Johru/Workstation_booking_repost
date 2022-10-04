import logger from '../logger';
import { BuildingEntity } from '../db';
import { appDataSource } from '../db';
import { logErrorAndReturnYesOrNo } from './logErrorAndReturnYesOrNo';
import { Success } from './success';

export interface IBuildingRepository {
  listCities(): Promise<BuildingEntity[]>;
  listBuildings(): Promise<BuildingEntity[]>;
  getSingleBuilding(buildingId: number): Promise<BuildingEntity | null>;
  addNewBuilding(body: BuildingEntity): Promise<Success>;
  updateBuilding(body: BuildingEntity, id: number): Promise<Success>;
  deleteBuilding(id: number): Promise<Success>;
}

export class BuildingRepository implements IBuildingRepository {
  async listCities(): Promise<BuildingEntity[]> {
    const searchForDistinctCity = await appDataSource
      .getRepository(BuildingEntity)
      .createQueryBuilder('building')
      .select(['building.building_city'])
      // .createQueryBuilder()
      // .select(['BuildingEntity.building_city'])
      .distinct(true)
      .getRawMany();

    logger.info(searchForDistinctCity);
    return searchForDistinctCity;
  }

  async listBuildings(): Promise<BuildingEntity[]> {
    return appDataSource
      .getRepository(BuildingEntity)
      .createQueryBuilder('building')
      .getMany();
  }
  async getSingleBuilding(buildingId: number): Promise<BuildingEntity | null> {
    return appDataSource
      .getRepository(BuildingEntity)
      .findOneBy({ building_id: buildingId });
  }

  async addNewBuilding(body: BuildingEntity): Promise<Success> {
    const resSave = new BuildingEntity();
    resSave.building_name = body.building_name;
    resSave.building_address = body.building_address;
    resSave.building_zip = body.building_zip;
    resSave.building_city = body.building_city;
    resSave.building_country = body.building_country;
    resSave.building_image = body.building_image;

    const addition = appDataSource.getRepository(BuildingEntity).save(resSave);
    return logErrorAndReturnYesOrNo(addition, 'Building');
  }

  async updateBuilding(body: BuildingEntity, id: number): Promise<Success> {
    const update = await appDataSource
      .getRepository(BuildingEntity)
      .update(id, {
        building_name: body.building_name,
        building_address: body.building_address,
        building_zip: body.building_zip,
        building_city: body.building_city,
        building_country: body.building_country,
        building_image: body.building_image,
      });
    return logErrorAndReturnYesOrNo(update, 'Building');
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

    return logErrorAndReturnYesOrNo(deletion, 'Building');
  }
}
