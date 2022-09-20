import { appDataSource } from '../db/connection';
import { Router } from 'express';
import { resourceLimits } from 'worker_threads';

import { IWorkstationService } from '../service';
import { Workstation } from '../db/models/workstation';

export class WorkstationController {
  private readonly _router: Router = Router();

  constructor(private workstationService: IWorkstationService) {
    this._router.get('/workstation', async (req, res) => {
      const workstationRepository = appDataSource.getRepository(Workstation);
      const result = await workstationRepository.find();
      res.status(200).json(result);
    });

    this._router.post('/workstation', async (req, res) => {
      const workstation: Workstation = req.body as Workstation;
      const workstationRepository = appDataSource.getRepository(Workstation);
      await workstationRepository.save(workstation);
      res.json(200);
    });

    this._router.put('/workstation/:id', async (req, res) => {
      var id = parseInt(req.params.id, 10);
      // const workstation: Workstation = req.body as Workstation;
      //to have the template

      const workstationRepository = appDataSource.getRepository(Workstation); //connection with SQL
      var workstationUpdate = await workstationRepository.find({
        where: {
          workstation_id: id,
        },
      });
      var workstationSave: Workstation = {};
      workstationUpdate.map(v => {
        workstationSave = v;
      });
      workstationSave.floor_id = req.body.floor_id;
      workstationSave.workstation_name = req.body.workstation_name;
      workstationSave.workstation_isactive = req.body.workstation_isactive;

      await workstationRepository.save(workstationSave);
      res.json(200);
    });

    this._router.delete('/workstation/:id', async (req, res) => {
      var id = parseInt(req.params.id, 10);
      const workstation: Workstation = req.body as Workstation; //to have the template

      const workstationRepository = appDataSource.getRepository(Workstation); //connection with SQL
      var workstationRemove = await workstationRepository.find({
        where: {
          workstation_id: id,
        },
      });
      await workstationRepository.remove(workstationRemove);
      res.json(200);
    });
  }

  get router(): Router {
    return this._router;
  }
}
