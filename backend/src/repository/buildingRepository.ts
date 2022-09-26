import { BuildingTable } from '../db/models/building';
import { appDataSource } from '../db';

export class BuildingRepository {
  async listCities(): Promise<BuildingTable[]> {
    return appDataSource
      .getRepository(BuildingTable)
      .createQueryBuilder('building')
      .select(['building.building_city'])
      .distinctOn(['building.building_city'])
      .orderBy('building.building_city')
      .getMany();
  }

  async listBuildings(): Promise<BuildingTable[]> {
    return appDataSource
      .getRepository(BuildingTable)
      .createQueryBuilder('building')
      .getMany();
  }
  async singleBuilding(buildingId: number): Promise<BuildingTable | null> {
    return appDataSource
      .getRepository(BuildingTable)
      .findOneBy({ building_id: buildingId });
  }

  async addNewBuilding(body: any): Promise<BuildingTable> {
    const resSave = new BuildingTable();
    resSave.building_name = body.buildingName;
    resSave.building_address = body.buildingAddress;
    resSave.building_zip = body.buildingZip;
    resSave.building_city = body.buildingCity;
    resSave.building_image = body.buildingImage;

    return appDataSource.getRepository(BuildingTable).save(resSave);
  }
  async deleteBuilding(id: number): Promise<any> {
    return appDataSource
      .createQueryBuilder()
      .delete()
      .from(BuildingTable)
      .where('building_id=:buildingId', {
        buildingId: id,
      })
      .execute();
  }
}
