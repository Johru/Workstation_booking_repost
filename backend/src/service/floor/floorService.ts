// import { Todo } from '../../db';
import { IFloorRepository } from '../../repository';
import { Response, Request } from 'express';
import { floorSchema } from './floorschema';
import { ValidationError } from 'joi';
import logger from '../../logger';
import { FloorEntity } from 'db';
import { Success } from 'repository/success';

export interface IFloorService {
  getFloors(): Promise<FloorEntity[]>;
  createFloor(
    floor: FloorEntity
  ): Promise<{ status: string; message: string[] }>;
  updateFloor(
    floorId:number, floor:FloorEntity
  ): Promise<{ status: string; message: string[] }>;
  deleteFloor(floorId:number): Promise<Success>;
  workstationCount(): Promise<any[]>

}

export class FloorService implements IFloorService {
  constructor(private floorRepository: IFloorRepository) {}

  async getFloors(): Promise<FloorEntity[]> {
    return await this.floorRepository.findAllFloors();
  }

  async createFloor(
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

    const newFloor = await this.floorRepository.saveFloor(floor);

    return {
      status: 'OK',
      message: [`Floor is succesfully saved with id: ${newFloor.floor_id}`],
    };
  }

  async updateFloor(
    floorId:number, floor:FloorEntity
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
    const newFloor = await this.floorRepository.updateFloor(
      floorId,
      floor
    );
    return {
      status: 'OK',
      message: [
        `Floor is succesfully updated and saved with its id: ${newFloor.floor_id}`,
      ],
    };
  } catch (error: any) {
    return { status: 'Error', message: ['Error record not found.'] };
  }
}


  async deleteFloor(floorId:number): Promise<Success> {
    return this.floorRepository.deleteFloor(floorId);
  }

  async workstationCount(): Promise<FloorEntity[]> {
    return this.floorRepository.countWorkstation();
  }


}
