import { BuildingRepository, Success } from '../../repository';
import { BuildingEntity } from '../../db';
import { buildingSchema } from './buildingSchema';
import Joi from 'joi';
import { ValidationError } from 'joi';
import logger from '../../logger';

export const idSchema = Joi.number().required();

export class BuildingService {
  constructor(public buildingRepository: BuildingRepository) {}

  listCities(): Promise<BuildingEntity[]> {
    return this.buildingRepository.listCities();
  }

  listBuildings(): Promise<BuildingEntity[]> {
    return this.buildingRepository.listBuildings();
  }

<<<<<<< HEAD
  async getSingleBuilding(id: number): Promise<BuildingEntity | []> {
    const findBuilding = await this.buildingRepository.getSingleBuilding(id);
    if (findBuilding === null) return [];
    return findBuilding;
=======
  getSingleBuilding(buildingId: number): Promise<BuildingEntity | null> {
    return this.buildingRepository.getSingleBuilding(buildingId);
>>>>>>> 1dfeff52448f42b5296542debc5281eb3b077aaf
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

    try {
      const requestDataValidation2 = await idSchema.validateAsync(id);
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

<<<<<<< HEAD
  async deleteBuilding(id: number): Promise<Success> {
    try {
      const requestDataValidation = await idSchema.validateAsync(id);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        return { success: 'no' };
      }
    }

    const deleteABuilding = await this.buildingRepository.deleteBuilding(id);
    return { success: 'yes' };
=======
  deleteBuilding(id: number): Promise<Success> {
    return this.buildingRepository.deleteBuilding(id);
>>>>>>> 1dfeff52448f42b5296542debc5281eb3b077aaf
  }
}
