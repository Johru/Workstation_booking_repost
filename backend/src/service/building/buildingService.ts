import { BuildingRepository, Success } from '../../repository';
import { UpdateResult } from 'typeorm';
import { BuildingEntity } from '../../db';

export class BuildingService {
  constructor(public buildingRepository: BuildingRepository) {}

  listCities(): Promise<BuildingEntity[]> {
    return this.buildingRepository.listCities();
  }
  listBuildings(): Promise<BuildingEntity[]> {
    return this.buildingRepository.listBuildings();
  }

  singleBuilding(buildingId: number): Promise<BuildingEntity | null> {
    return this.buildingRepository.singleBuilding(buildingId);
  }
  addNewBuilding(requestBody: BuildingEntity): Promise<BuildingEntity> {
    return this.buildingRepository.addNewBuilding(requestBody);
  }

  updateBuilding(
    requestBody: BuildingEntity,
    id: number
  ): Promise<UpdateResult> {
    return this.buildingRepository.updateBuilding(requestBody, id);
  }
  deleteBuilding(id: number): Promise<Success> {
    return this.buildingRepository.deleteBuilding(id);
  }
}
