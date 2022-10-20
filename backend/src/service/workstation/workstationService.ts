import { WorkstationEntity } from '../../db';
import { IWorkstationRepository } from '../../repository';
import { workstationSchema } from './workstationschema';
import { ValidationError } from 'joi';
import logger from '../../logger';
import { Success } from '../../repository';
import { validateInput } from '../validateInput';
import { idSchema } from '../idSchema';

export interface IWorkstationService {
  findLocationByWorkstation(
    workstationId: number
  ): Promise<WorkstationEntity[]>;
  getWorkstations(): Promise<WorkstationEntity[]>;
  showWorkstationOnFloor(floorId: number): Promise<WorkstationEntity[]>;
  createWorkstation(
    workstation: WorkstationEntity,
    seatsNumber: number
  ): Promise<{ status: string; message: string[] }>;
  updateWorkstation(
    workstationId: number,
    workstation: WorkstationEntity
  ): Promise<{ status: string; message: string[] }>;
  setWorkstationToActive(
    workstationId: number
  ): Promise<{ status: string; message: string[] }>;
  setWorkstationToInActive(
    workstationId: number
  ): Promise<{ status: string; message: string[] }>;
  deleteWorkstation(workstationId: number): Promise<Success>;
}

export class WorkstationService implements IWorkstationService {
  constructor(private workstationRepository: IWorkstationRepository) {}

  async getWorkstations(): Promise<WorkstationEntity[]> {
    return await this.workstationRepository.findAllWorkstations();
  }

  async findLocationByWorkstation(
    workstationId: number
  ): Promise<WorkstationEntity[]> {
    const validation = await validateInput(idSchema, workstationId);
    if (!validation) return [];
    return await this.workstationRepository.findLocationByWorkstation(
      workstationId
    );
  }

  async showWorkstationOnFloor(floorId: number): Promise<WorkstationEntity[]> {
    return await this.workstationRepository.findAllWorkstationsOnFloor(floorId);
  }

  async createWorkstation(
    workstation: WorkstationEntity,
    seatsNumber: number
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
      workstation,
      seatsNumber
    );

    return {
      status: 'OK',
      message: [
        `Workstation is succesfully saved with id: ${newWorkstation.workstation_id}`,
      ],
    };
  }

  async updateWorkstation(
    workstationId: number,
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

    try {
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
    } catch (error: any) {
      return { status: 'Error', message: [error.message] };
    }
  }

  async setWorkstationToActive(
    workstationId: number
  ): Promise<{ status: string; message: string[] }> {
    try {
      const newWorkstation = await this.workstationRepository.setStatusToActive(
        workstationId
      );
      return {
        status: 'OK',
        message: [
          `Workstation is succesfully updated and saved with its id: ${newWorkstation.workstation_id}`,
        ],
      };
    } catch (error: any) {
      return { status: 'Error', message: [error.message] };
    }
  }

  async setWorkstationToInActive(
    workstationId: number
  ): Promise<{ status: string; message: string[] }> {
    try {
      const newWorkstation =
        await this.workstationRepository.setStatusToInActive(workstationId);
      return {
        status: 'OK',
        message: [
          `Workstation is succesfully updated and saved with its id: ${newWorkstation.workstation_id}`,
        ],
      };
    } catch (error: any) {
      return { status: 'Error', message: [error.message] };
    }
  }
  async deleteWorkstation(workstationId: number): Promise<Success> {
    return this.workstationRepository.deleteWorkstation(workstationId);
  }
}
