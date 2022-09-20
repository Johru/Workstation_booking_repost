import { Workstation } from '../../db';
// import { ITodoRepository } from '../../repository';
import { IWorkstationRepository } from '../../repository';
// import { todoSchema } from './schema';
import { workstationSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface IWorkstationService {
  getWorkstations(): Promise<Workstation[]>;
  createWorkstation(
    workstation: Workstation
  ): Promise<{ status: string; message: string[] }>;
}

export class WorkstationService implements IWorkstationService {
  constructor(private workstationRepository: IWorkstationRepository) {}

  async getWorkstations(): Promise<Workstation[]> {
    return await this.workstationRepository.findAllWorkstations();
  }

  async createWorkstation(
    workstation: Workstation
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
}
