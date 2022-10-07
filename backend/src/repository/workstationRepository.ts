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
  setStatus(
    workstationId: number,
    workstation: WorkstationEntity
  ): Promise<WorkstationEntity>;

  deleteWorkstation(workstationId: number): Promise<Success>;
}

export class WorkstationRepository implements IWorkstationRepository {
  async findAllWorkstations(): Promise<WorkstationEntity[]> {
    return appDataSource.getRepository(WorkstationEntity).find({
      relations: {
        seats: true,
      },
    });
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

    const result = await appDataSource
      .getRepository(WorkstationEntity)
      .save(workstationToSave);

    for (let index = 0; index < seatsNumber; index++) {
      const seatToSave = new SeatEntity();
      seatToSave.workstation = workstationToSave;
      appDataSource.getRepository(SeatEntity).save(seatToSave);
    }

    return result;
  }

  async updateWorkstation(
    workstationId: number,
    workstation: WorkstationEntity
  ): Promise<WorkstationEntity> {
    const findWorkstation = await appDataSource
      .getRepository(WorkstationEntity)
      .findOne({
        where: {
          workstation_id: workstationId,
        },
      });

    if (findWorkstation == null) {
      throw new Error('Record does not exits');
    } else {
      await appDataSource
        .createQueryBuilder()
        .update(WorkstationEntity)
        .set({
          workstation_name: workstation.workstation_name,
        })
        .where('workstation_id = :id', { id: workstationId })
        .execute();

      return findWorkstation;
    }
  }

  async setStatus(
    workstationId: number,
    workstation: WorkstationEntity
  ): Promise<WorkstationEntity> {
    const findWorkstation = await appDataSource
      .getRepository(WorkstationEntity)
      .findOne({
        where: {
          workstation_id: workstationId,
        },
      });

    if (findWorkstation == null) {
      throw new Error('Record does not exits');
    } else {
      await appDataSource
        .createQueryBuilder()
        .update(WorkstationEntity)
        .set({
          workstation_isactive: workstation.workstation_isactive,
        })
        .where('workstation_id = :id', { id: workstationId })
        .execute();

      return findWorkstation;
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
