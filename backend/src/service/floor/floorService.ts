// import { Todo } from '../../db';
import { IFloorRepository } from '../../repository';
import { Response, Request } from 'express';
import { floorSchema } from './floorschema';
import { ValidationError } from 'joi';
import logger from '../../logger';
import { FloorTable } from 'db';

export interface IFloorService {
  getFloors(): Promise<FloorTable[]>;
  createFloor(floor: FloorTable): Promise<{ status: string; message: string[] }>;
  updatedFloor(req: Request,res: Response): Promise<{ status: string; message: string[] }>;
  deletedFloor(req: Request, res: Response): Promise<{status: string; message: string[]}>;
}

export class FloorService implements IFloorService {
  constructor(private floorRepository: IFloorRepository) {}

  async getFloors(): Promise<FloorTable[]> {
    return await this.floorRepository.findAllFloors();
  }

  async createFloor(floor: FloorTable): Promise<{ status: string; message: string[] }> {
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

  async updatedFloor(req: Request,res: Response): Promise<{ status: string; message: string[] }> {
    const floor: FloorTable = req.body as FloorTable;
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
    var id = parseInt(req.params.id, 10);
    const newFloor = await this.floorRepository.updateFloor(
    id,floor
    );

    return {
      status: 'OK',
      message: [
        `Floor is succesfully updated and saved with its id: ${newFloor.floor_id}`,
      ],
    };
  }


  async deletedFloor(req: Request,res: Response): Promise<{status: string; message: string[]}> {
    const floor: FloorTable = req.body as FloorTable;
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
    var id = parseInt(req.params.id, 10);
    await this.floorRepository.deleteFloor(id);

    return {
        status: 'OK',
        message: 
          [`Floor is succesfully removed.`],
        
      };
}

}