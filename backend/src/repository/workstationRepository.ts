import { appDataSource } from '../db';
import { WorkstationEntity } from '../db';
import { SeatEntity } from '../db';
import { Success } from './success';

export interface IWorkstationRepository {
  findAllWorkstations(): Promise<WorkstationEntity[]>;
  findAllWorkstationsOnFloor(floorId: number): Promise<WorkstationEntity[]>;
  saveWorkstation(
    workstation: WorkstationEntity,
    seatsNumber: number
  ): Promise<WorkstationEntity>;
  updateWorkstation(
    workstationId: number,
    workstation: WorkstationEntity
  ): Promise<WorkstationEntity>;
  deleteWorkstation(workstationId: number): Promise<Success>;
}

export class WorkstationRepository implements IWorkstationRepository {
  async findAllWorkstations(): Promise<WorkstationEntity[]> {
    return appDataSource.getRepository(WorkstationEntity).find();
  }

  async findAllWorkstationsOnFloor(
    floorId: number
  ): Promise<WorkstationEntity[]> {
    return appDataSource.getRepository(WorkstationEntity).find({
      where: {
        floor_id: floorId,
      },
    });
  }

  async saveWorkstation(
    workstation: WorkstationEntity,
    seatsNumber: number
  ): Promise<WorkstationEntity> {
    const workstationToSave = new WorkstationEntity();
    workstationToSave.floor_id = workstation.floor_id;
    workstationToSave.workstation_name = workstation.workstation_name;
    if (workstation.hasOwnProperty('workstation_isactive')) {
      workstationToSave.workstation_isactive = workstation.workstation_isactive;
    }

    const result = await appDataSource
      .getRepository(WorkstationEntity)
      .save(workstationToSave);

    for (let index = 0; index < seatsNumber; index++) {
      const seatToSave = new SeatEntity();
      seatToSave.workstation_id = result.workstation_id;
      appDataSource.getRepository(SeatEntity).save(seatToSave);
    }

    return result;
  }

  async updateWorkstation(
    workstationId: number,
    workstation: WorkstationEntity
  ): Promise<WorkstationEntity> {
    var workstationUpdate = await appDataSource
      .getRepository(WorkstationEntity)
      .findOne({
        where: {
          workstation_id: workstationId,
        },
      });

    if (workstationUpdate == null) {
      let err = new Error();
      err.message = 'Record not found.';
      return Promise.reject(err);
    } else {
      workstationUpdate.floor_id = workstation.floor_id
      workstationUpdate.workstation_name = workstation.workstation_name
      workstationUpdate.workstation_isactive = workstation.workstation_isactive
      return appDataSource.getRepository(WorkstationEntity).save(workstationUpdate);
    }
  }

  async deleteWorkstation(workstationId: number): Promise<Success> {
    var workstationRemove = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(WorkstationEntity)
      .where('workstation_id =:workstationId', { workstationId: workstationId })
      .execute();

    if (workstationRemove.affected == 0) {
      return { success: 'no' };
    } else {
      return { success: 'yes' };
    }
  }
}
