import { appDataSource } from '../db';
import { WorkstationTable } from '../db';

import { Response, Request } from 'express';

export interface IWorkstationRepository {
  findAllWorkstations(): Promise<WorkstationTable[]>;
  findAllWorkstationsOnFloor(floorId: number): Promise<WorkstationTable[]>;
  saveWorkstation(workstation: WorkstationTable): Promise<WorkstationTable>;
  updateWorkstation(workstationId: number, workstation: WorkstationTable):Promise<WorkstationTable>;
  deleteWorkstation(workstationId: number):Promise<WorkstationTable[]>;
}

export class WorkstationRepository implements IWorkstationRepository {
  async findAllWorkstations(): Promise<WorkstationTable[]> {
    return appDataSource.getRepository(WorkstationTable).find();
  }

  async findAllWorkstationsOnFloor(floorId: number): Promise<WorkstationTable[]> {
    return appDataSource.getRepository(WorkstationTable).find({
      where: {
        floor_id: floorId,
      },
    });
  }

  async saveWorkstation(workstation: WorkstationTable): Promise<WorkstationTable> {
    const workstationToSave = new WorkstationTable();
    workstationToSave.floor_id = workstation.floor_id;
    workstationToSave.workstation_name = workstation.workstation_name;
    if(workstation.hasOwnProperty('workstation_isactive')){
      workstationToSave.workstation_isactive = workstation.workstation_isactive
    }
    return appDataSource.getRepository(WorkstationTable).save(workstationToSave);
  }

  async updateWorkstation(workstationId: number, workstation: WorkstationTable): Promise<WorkstationTable> {
    var workstationUpdate = await appDataSource.getRepository(WorkstationTable).find({
      where: {
        workstation_id: workstationId,
      },
    });
    var workstationToSave: WorkstationTable = {};
    workstationUpdate.map(v => {
      workstationToSave = v;
    });
    workstationToSave.floor_id = workstation.floor_id;
    workstationToSave.workstation_name = workstation.workstation_name;
    if(workstation.hasOwnProperty('workstation_isactive')){
      workstationToSave.workstation_isactive = workstation.workstation_isactive
    }
    return appDataSource.getRepository(WorkstationTable).save(workstationToSave);
  }

  async deleteWorkstation(workstationId: number): Promise<WorkstationTable[]> {
    var workstationRemove = await appDataSource.getRepository(WorkstationTable).find({
      where: {
        workstation_id: workstationId,
      },
    });
    return appDataSource.getRepository(WorkstationTable).remove(workstationRemove)

  }

}
