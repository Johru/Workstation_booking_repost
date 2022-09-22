import { appDataSource } from '../db';
import { Workstation } from '../db';

import { Response, Request } from 'express';

export interface IWorkstationRepository {
  findAllWorkstations(): Promise<Workstation[]>;
  findAllWorkstationsOnFloor(id: number): Promise<Workstation[]>;
  saveWorkstation(workstation: Workstation): Promise<Workstation>;
  updateWorkstation(id: number, workstation: Workstation):Promise<Workstation>;
  deleteWorkstation(id: number):Promise<Workstation[]>;
}

export class WorkstationRepository implements IWorkstationRepository {
  async findAllWorkstations(): Promise<Workstation[]> {
    return appDataSource.getRepository(Workstation).find();
  }

  async findAllWorkstationsOnFloor(id: number): Promise<Workstation[]> {
    return appDataSource.getRepository(Workstation).find({
      where: {
        floor_id: id,
      },
    });
  }

  async saveWorkstation(workstation: Workstation): Promise<Workstation> {
    const workstationToSave = new Workstation();
    workstationToSave.floor_id = workstation.floor_id;
    workstationToSave.workstation_name = workstation.workstation_name;
    if(workstation.hasOwnProperty('workstation_isactive')){
      workstationToSave.workstation_isactive = workstation.workstation_isactive
    }
    return appDataSource.getRepository(Workstation).save(workstationToSave);
  }

  async updateWorkstation(id: number, workstation: Workstation): Promise<Workstation> {
    var workstationUpdate = await appDataSource.getRepository(Workstation).find({
      where: {
        workstation_id: id,
      },
    });
    var workstationToSave: Workstation = {};
    workstationUpdate.map(v => {
      workstationToSave = v;
    });
    workstationToSave.floor_id = workstation.floor_id;
    workstationToSave.workstation_name = workstation.workstation_name;
    if(workstation.hasOwnProperty('workstation_isactive')){
      workstationToSave.workstation_isactive = workstation.workstation_isactive
    }
    return appDataSource.getRepository(Workstation).save(workstationToSave);
  }

  async deleteWorkstation(id: number): Promise<Workstation[]> {
    var workstationRemove = await appDataSource.getRepository(Workstation).find({
      where: {
        workstation_id: id,
      },
    });
    return appDataSource.getRepository(Workstation).remove(workstationRemove)

  }

}
