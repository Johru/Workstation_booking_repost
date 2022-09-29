import { appDataSource } from '../db';
import { WorkstationEntity } from '../db';
import { Response, Request } from 'express';
import { Success } from './success';


export interface IWorkstationRepository {
  findAllWorkstations(): Promise<WorkstationEntity[]>;
  findAllWorkstationsOnFloor(floorId: number): Promise<WorkstationEntity[]>;
  saveWorkstation(workstation: WorkstationEntity): Promise<WorkstationEntity>;
  updateWorkstation(
    workstationId: number,
    workstation: WorkstationEntity
  ): Promise<WorkstationEntity>;
  deleteWorkstation(req: Request, res: Response): Promise<Success>;
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
    workstation: WorkstationEntity
  ): Promise<WorkstationEntity> {
    const workstationToSave = new WorkstationEntity();
    workstationToSave.floor_id = workstation.floor_id;
    workstationToSave.workstation_name = workstation.workstation_name;
    if (workstation.hasOwnProperty('workstation_isactive')) {
      workstationToSave.workstation_isactive = workstation.workstation_isactive;
    }
    return appDataSource
      .getRepository(WorkstationEntity)
      .save(workstationToSave);
  }

  async updateWorkstation(
    workstationId: number,
    workstation: WorkstationEntity
  ): Promise<WorkstationEntity> {
    var workstationUpdate = await appDataSource
      .getRepository(WorkstationEntity)
      .find({
        where: {
          workstation_id: workstationId,
        },
      });
    var workstationToSave: WorkstationEntity = {};
    workstationUpdate.map(v => {
      workstationToSave = v;
    });
    workstationToSave.floor_id = workstation.floor_id;
    workstationToSave.workstation_name = workstation.workstation_name;
    if (workstation.hasOwnProperty('workstation_isactive')) {
      workstationToSave.workstation_isactive = workstation.workstation_isactive;
    }
    return appDataSource
      .getRepository(WorkstationEntity)
      .save(workstationToSave);
  }

  // async deleteWorkstation(workstationId: number): Promise<WorkstationEntity[]> {
  //   var workstationRemove = await appDataSource.getRepository(WorkstationEntity).find({
  //       where: {
  //         workstation_id: workstationId,
  //       },
  //     });
  //   return appDataSource.getRepository(WorkstationEntity).remove(workstationRemove);
  // }

  async deleteWorkstation(req: Request, res: Response): Promise<Success> {
    var workstationId = parseInt(req.params.workstationId, 10);
    var workstationRemove = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(WorkstationEntity)
      .where('workstation_id =:workstationId', { workstationId: workstationId })
      .execute();

    if (workstationRemove.affected == 0) {
      return {success:"yes"}
    } else {
      return {success:"no"}
    }
  }
}
