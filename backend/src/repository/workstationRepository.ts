import { appDataSource } from '../db';
import { WorkstationEntity } from '../db';
import { SeatEntity } from '../db';
import { Success } from './success';

export interface IWorkstationRepository {
  findLocationByWorkstation(
    workstationId: number
  ): Promise<WorkstationEntity[]>;
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
  setStatusToActive(workstationId: number): Promise<WorkstationEntity>;
  setStatusToInActive(workstationId: number): Promise<WorkstationEntity>;

  deleteWorkstation(workstationId: number): Promise<Success>;
}

export class WorkstationRepository implements IWorkstationRepository {
  findLocationByWorkstation(
    workstationId: number
  ): Promise<WorkstationEntity[]> {
    return appDataSource
      .getRepository(WorkstationEntity)
      .createQueryBuilder('workstation')
      .select('workstation.workstation_name')
      .leftJoin('workstation.floor', 'floor')
      .addSelect(['floor.floor_name'])
      .leftJoin('floor.building', 'building')
      .addSelect(['building.building_name', 'building.building_address'])
      .where('workstation.workstation_id = :id', { id: workstationId })
      .getMany();
  }

  async findAllWorkstations(): Promise<WorkstationEntity[]> {
    return appDataSource.getRepository(WorkstationEntity).find({
      relations: {
        seat: true,
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

  async setStatusToActive(workstationId: number): Promise<WorkstationEntity> {
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
          workstation_isactive: true,
        })
        .where('workstation_id = :id', { id: workstationId })
        .execute();

      return findWorkstation;
    }
  }

  async setStatusToInActive(workstationId: number): Promise<WorkstationEntity> {
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
          workstation_isactive: false,
        })
        .where('workstation_id = :id', { id: workstationId })
        .execute();

      return findWorkstation;
    }
  }

  async deleteWorkstation(workstationId: number): Promise<Success> {
    const workstationRemove = await appDataSource
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
