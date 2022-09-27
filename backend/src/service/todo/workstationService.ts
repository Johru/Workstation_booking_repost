import { WorkstationTable } from '../../db';
// import { ITodoRepository } from '../../repository';
import { IWorkstationRepository } from '../../repository';
// import { todoSchema } from './schema';
import { Response, Request } from 'express';
import { workstationSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface IWorkstationService {
  getWorkstations(): Promise<WorkstationTable[]>;
  showWorkstation(req: Request, res: Response): Promise<WorkstationTable[]>;
  createWorkstation(workstation: WorkstationTable): Promise<{ status: string; message: string[] }>;
  updatedWorkstation(req: Request,res: Response): Promise<{ status: string; message: string[] }>;
  deletedWorkstation(req: Request, res: Response): Promise<{status: string; message: string[]}>;
}

export class WorkstationService implements IWorkstationService {
  constructor(private workstationRepository: IWorkstationRepository) {}

  async getWorkstations(): Promise<WorkstationTable[]> {
    return await this.workstationRepository.findAllWorkstations();
  }

  async showWorkstation(req: Request, res: Response): Promise<WorkstationTable[]> {
    var id = parseInt(req.params.id, 10);
    return await this.workstationRepository.findAllWorkstationsOnFloor(id);
  }

  async createWorkstation(
    workstation: WorkstationTable
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

  async updatedWorkstation(req: Request,res: Response): Promise<{ status: string; message: string[] }> {
    const workstation: WorkstationTable = req.body as WorkstationTable;
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
    var id = parseInt(req.params.id, 10);
    const newWorkstation = await this.workstationRepository.updateWorkstation(
    id,workstation
    );

    return {
      status: 'OK',
      message: [
        `Workstation is succesfully updated and saved with its id: ${newWorkstation.workstation_id}`,
      ],
    };
  }

  async deletedWorkstation(req: Request,res: Response): Promise<{status: string; message: string[]}> {
    const workstation: WorkstationTable = req.body as WorkstationTable;
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
    var id = parseInt(req.params.id, 10);
    await this.workstationRepository.deleteWorkstation(
      id
    );

    return {
      status: 'OK',
      message: [
        `Workstation is succesfully removed.`,
      ],
    };
  }
}
