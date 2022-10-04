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
  updatedFloor(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }>;
  deletedFloor(req: Request, res: Response): Promise<Success>;
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

  async updatedFloor(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }> {
    const floor: FloorEntity = req.body as FloorEntity;
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
    var floorId = parseInt(req.params.floorId, 10);
    const newFloor = await this.floorRepository.updateFloor(floorId, floor);

    return {
      status: 'OK',
      message: [
        `Floor is succesfully updated and saved with its id: ${newFloor.floor_id}`,
      ],
    };
  }

  async deletedFloor(req: Request, res: Response): Promise<Success> {
    try {
      await this.floorRepository.deleteFloor(req, res);
      return { success: 'yes' };
    } catch (error) {
      return { success: 'no' };
    }
  }

  async workstationCount(): Promise<any[]> {
    return this.floorRepository.countWorkstationAndSeat();
  }


}
