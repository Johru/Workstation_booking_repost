import { BuildingRepository, Success } from '../../repository';
import { BuildingEntity } from '../../db';
import { buildingSchema } from './buildingSchema';
import { idSchema } from '../index';
import { yesOrNo } from '../index';

export class BuildingService {
  constructor(public buildingRepository: BuildingRepository) {}

  listCities(): Promise<BuildingEntity[]> {
    return this.buildingRepository.listCities();
  }

  listBuildings(): Promise<BuildingEntity[]> {
    return this.buildingRepository.listBuildings();
  }

  async getSingleBuilding(id: number): Promise<BuildingEntity | []> {
    const findBuilding = await this.buildingRepository.getSingleBuilding(id);
    if (findBuilding === null) return [];
    return findBuilding;
  }

  async addNewBuilding(requestBody: BuildingEntity): Promise<Success> {
    const validation = await yesOrNo(buildingSchema, requestBody);
    if (!validation) return { success: 'no' };

    return this.buildingRepository.addNewBuilding(requestBody);
  }

  async updateBuilding(
    requestBody: BuildingEntity,
    id: number
  ): Promise<Success> {
    const validation = await yesOrNo(buildingSchema, requestBody);
    if (!validation) return { success: 'no' };

    const validation2 = await yesOrNo(idSchema, id);
    if (!validation2) return { success: 'no' };

    return this.buildingRepository.updateBuilding(requestBody, id);
  }

  async deleteBuilding(id: number): Promise<Success> {
    const validation = await yesOrNo(idSchema, id);
    if (!validation) return { success: 'no' };

    return this.buildingRepository.deleteBuilding(id);
  }
}
