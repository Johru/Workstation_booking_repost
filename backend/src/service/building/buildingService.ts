import { BuildingRepository, Success } from '../../repository';
import { BuildingEntity } from '../../db';
import { buildingSchema } from './buildingSchema';
import { ValidationError } from 'joi';
import logger from '../../logger';

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
  async addNewBuilding(requestBody: BuildingEntity): Promise<Success> {
    try {
      const requestDataValidation = await buildingSchema.validateAsync(
        requestBody
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        return { success: 'no' };
      }
    }
    const newBuilding = await this.buildingRepository.addNewBuilding(
      requestBody
    );
    return { success: 'yes' };
  }

  async updateBuilding(
    requestBody: BuildingEntity,
    id: number
  ): Promise<Success> {
    try {
      const requestDataValidation = await buildingSchema.validateAsync(
        requestBody
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        return { success: 'no' };
      }
    }
    const updateABuilding = await this.buildingRepository.updateBuilding(
      requestBody,
      id
    );
    return { success: 'yes' };
  }
  deleteBuilding(id: number): Promise<Success> {
    return this.buildingRepository.deleteBuilding(id);
  }
}
