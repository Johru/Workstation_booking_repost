import { WorkstationEntity } from '../../db';
// import { ITodoRepository } from '../../repository';
import { IWorkstationRepository } from '../../repository';
// import { todoSchema } from './schema';
import { Response, Request } from 'express';
import { workstationSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';
import { Success } from '../../repository';

export interface IWorkstationService {
  getWorkstations(): Promise<WorkstationEntity[]>;
  showWorkstationOnFloor(
    req: Request,
    res: Response
  ): Promise<WorkstationEntity[]>;
  createdWorkstation(
    workstation: WorkstationEntity
  ): Promise<{ status: string; message: string[] }>;
  updatedWorkstation(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }>;
  deletedWorkstation(req: Request, res: Response): Promise<Success>;
}

export class WorkstationService implements IWorkstationService {
  constructor(private workstationRepository: IWorkstationRepository) {}

  async getWorkstations(): Promise<WorkstationEntity[]> {
    return await this.workstationRepository.findAllWorkstations();
  }

  async showWorkstationOnFloor(
    req: Request,
    res: Response
  ): Promise<WorkstationEntity[]> {
    var floorId = parseInt(req.params.floorId, 10);
    return await this.workstationRepository.findAllWorkstationsOnFloor(floorId);
  }

  async createdWorkstation(
    workstation: WorkstationEntity
  ): Promise<{ status: string; message: string[] }> {
    try {
      const value = await workstationSchema.validateAsync(workstation);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newWorkstation = await this.workstationRepository.saveWorkstation(
      workstation
    );

    return {
      status: 'OK',
      message: [
        `Workstation is succesfully saved with id: ${newWorkstation.workstation_id}`,
      ],
    };
  }

  async updatedWorkstation(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }> {
    const workstation: WorkstationEntity = req.body as WorkstationEntity;
    try {
      const value = await workstationSchema.validateAsync(workstation);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }
    var workstationId = parseInt(req.params.workstationId, 10);
    const newWorkstation = await this.workstationRepository.updateWorkstation(
      workstationId,
      workstation
    );

    return {
      status: 'OK',
      message: [
        `Workstation is succesfully updated and saved with its id: ${newWorkstation.workstation_id}`,
      ],
    };
  }

  async deletedWorkstation(req: Request, res: Response): Promise<Success> {
  
    try {
      
      await this.workstationRepository.deleteWorkstation(req,res);
      return {success:"yes"} 
    } catch (error) {
      return {success:"no"}
    }
  }
}
