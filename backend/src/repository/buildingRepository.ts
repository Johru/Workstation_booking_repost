import { BuildingEntity } from '../db/entity/buildingEntity';
import { appDataSource } from '../db';

export class BuildingRepository {
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

  async addNewBuilding(body: any): Promise<BuildingEntity> {
    const resSave = new BuildingEntity();
    resSave.building_name = body.buildingName;
    resSave.building_address = body.buildingAddress;
    resSave.building_zip = body.buildingZip;
    resSave.building_city = body.buildingCity;
    resSave.building_image = body.buildingImage;

    return appDataSource.getRepository(BuildingEntity).save(resSave);
  }

  async updateBuilding(body: any, id: number): Promise<any> {
    return appDataSource.getRepository(BuildingEntity).update(id, {
      building_name: body.buildingName,
      building_address: body.buildingAddress,
      building_zip: body.buildingZip,
      building_city: body.buildingCity,
      building_image: body.buildingImage,
    });
  }
  async deleteBuilding(id: number): Promise<any> {
    return appDataSource
      .createQueryBuilder()
      .delete()
      .from(BuildingEntity)
      .where('building_id=:buildingId', {
        buildingId: id,
      })
      .execute();
  }
}
