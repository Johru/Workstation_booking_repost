import { appDataSource } from '../db';
import { Workstation } from '../db';

export interface IWorkstationRepository {
  findAllWorkstations(): Promise<Workstation[]>;
  saveWorkstation(workstation: Workstation): Promise<Workstation>;
}

export class WorkstationRepository implements IWorkstationRepository {
  async findAllWorkstations(): Promise<Workstation[]> {
    return appDataSource.getRepository(Workstation).find();
  }

  saveWorkstation(workstation: Workstation): Promise<Workstation> {
    const workstationToSave = new Workstation();
    workstationToSave.floor_id = workstation.floor_id;
    workstationToSave.workstation_name = workstation.workstation_name;
    workstationToSave.workstation_isactive = workstation.workstation_isactive;

    return appDataSource.getRepository(Workstation).save(workstationToSave);
  }
}
