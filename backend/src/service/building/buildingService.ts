import { ValidationError } from 'joi';
import logger from '../../logger';
import { BuildingRepository } from '../../repository/buildingRepository';
import { BuildingEntity } from '../../db/entity/buildingEntity';

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
  addNewBuilding(body: any): Promise<BuildingEntity> {
    return this.buildingRepository.addNewBuilding(body);
  }

  updateBuilding(body: any, id: number): Promise<any> {
    return this.buildingRepository.updateBuilding(body, id);
  }
  deleteBuilding(id: number): Promise<BuildingEntity> {
    return this.buildingRepository.deleteBuilding(id);
  }
}
