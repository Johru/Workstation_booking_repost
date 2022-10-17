import { IFloorRepository } from '../../repository';
import { floorSchema } from './floorschema';
import { ValidationError } from 'joi';
import logger from '../../logger';
import { FloorEntity, BuildingEntity } from '../../db';
import { BuildingRepository } from '../../repository';
import { Success } from 'repository/success';

export interface IFloorService {
  getFloors(): Promise<FloorEntity[]>;
  showFloorInBuilding(buildingId: number): Promise<FloorEntity[]>;
  createFloor(
    floor: FloorEntity,
    buildingId: number
  ): Promise<{ status: string; message: string[] }>;
  updateFloor(
    floorId: number,
    floor: FloorEntity
  ): Promise<{ status: string; message: string[] }>;
  deleteFloor(floorId: number): Promise<Success>;
}

export class FloorService implements IFloorService {
  constructor(
    private floorRepository: IFloorRepository,
    private buildingRepository: BuildingRepository
  ) {}

  async getFloors(): Promise<FloorEntity[]> {
    return await this.floorRepository.findAllFloors();
  }

  async showFloorInBuilding(buildingId: number): Promise<FloorEntity[]> {
    const floors = await this.floorRepository.findAllFloorInBuilding(
      buildingId
    );

    for (const floor of floors) {
      floor.workstation = floor.workstation?.map(workstation => {
        const numberOfSeats = workstation.seat?.length;
        delete workstation.seat;
        return { ...workstation, allSeats: numberOfSeats };
      });
    }

    return floors;
  }

  async createFloor(
    floor: FloorEntity,
    buildingId: number
  ): Promise<{ status: string; message: string[]; floor?: FloorEntity }> {
    try {
      const value = await floorSchema.validateAsync(floor);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const building = await this.buildingRepository.getSingleBuilding(
      buildingId
    );

    const newFloor = await this.floorRepository.saveFloor(floor, building);
    newFloor.workstation = [];

    return {
      status: 'OK',
      message: [`Floor is succesfully saved with id: ${newFloor.floor_id}`],
      floor: newFloor,
    };
  }

  async updateFloor(
    floorId: number,
    floor: FloorEntity
  ): Promise<{ status: string; message: string[] }> {
    try {
      const value = await floorSchema.validateAsync(floor);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    try {
      const newFloor = await this.floorRepository.updateFloor(floorId, floor);
      return {
        status: 'OK',
        message: [
          `Floor is succesfully updated and saved with its id: ${newFloor.floor_id}`,
        ],
      };
    } catch (error: any) {
      return { status: 'Error', message: [error.message] };
    }
  }

  async deleteFloor(floorId: number): Promise<Success> {
    return this.floorRepository.deleteFloor(floorId);
  }
}
