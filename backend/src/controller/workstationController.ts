import { appDataSource } from '../db/connection';
import { Router, Response, Request } from 'express';
import { resourceLimits } from 'worker_threads';

import { IWorkstationService } from '../service';
import { WorkstationTable } from '../db/models/workstation';
import { equal } from 'joi';

export class WorkstationController {
  private readonly _router: Router = Router();

  constructor(private workstationService: IWorkstationService) {

    // Show all workstations
    this._router.get('/workstation', async (req: Request, res: Response) => {
      res.status(200).json(await this.workstationService.getWorkstations());
    });


    // Show all workstations base on floor id
    this._router.get('/workstation/:id', async (req: Request, res: Response) => {
      res.status(200).json(await this.workstationService.showWorkstation( req, res));
    });

   // create wworkstation  
    this._router.post('/workstation', async (req: Request, res: Response) => {
      const workstation: WorkstationTable = req.body as WorkstationTable;
      res.status(200).json(await this.workstationService.createWorkstation(workstation));
    });

    // update workstation
    this._router.put('/workstation/:id', async (req: Request, res: Response) => {
      res.status(200).json(await this.workstationService.updatedWorkstation(req,res))
    });


    //  delete workstation
    this._router.delete('/workstation/:id', async (req, res) => {
      res.status(200).json(await this.workstationService.deletedWorkstation(req,res))
    });
  }

  get router(): Router {
    return this._router;
  }
}
