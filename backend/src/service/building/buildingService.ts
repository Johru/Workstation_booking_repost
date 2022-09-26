import { ValidationError } from 'joi';
import logger from '../../logger';
import { BuildingRepository } from '../../repository/buildingRepository';
import { BuildingTable } from '../../db/models/building';

export class BuildingService {
  constructor(public buildingRepository: BuildingRepository) {}

  listCities(): Promise<BuildingTable[]> {
    return this.buildingRepository.listCities();
  }
  listBuildings(): Promise<BuildingTable[]> {
    return this.buildingRepository.listBuildings();
  }

  singleBuilding(buildingId: number): Promise<BuildingTable | null> {
    return this.buildingRepository.singleBuilding(buildingId);
  }
  addNewBuilding(body: any): Promise<BuildingTable> {
    return this.buildingRepository.addNewBuilding(body);
  }

  updateBuilding(body: any, id: number): Promise<any> {
    return this.buildingRepository.updateBuilding(body, id);
  }
  deleteBuilding(id: number): Promise<BuildingTable> {
    return this.buildingRepository.deleteBuilding(id);
  }
}
