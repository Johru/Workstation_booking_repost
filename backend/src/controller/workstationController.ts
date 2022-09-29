import { appDataSource } from '../db/connection';
import { Router, Response, Request } from 'express';
import { resourceLimits } from 'worker_threads';

import { IWorkstationService } from '../service';
import { WorkstationEntity } from '../db/models/workstationEntity';
import { equal } from 'joi';

export class WorkstationController {
  private readonly _router: Router = Router();

  constructor(private workstationService: IWorkstationService) {

    // Show all workstations
    this._router.get('/workstation/showall', async (req: Request, res: Response) => {
      res.status(200).json(await this.workstationService.getWorkstations());
    });


    // Show all workstations base on floor id
    this._router.get('/workstation/:floorId/showonfloor', async (req: Request, res: Response) => {
      res.status(200).json(await this.workstationService.showWorkstationOnFloor( req, res));
    });

   // create wworkstation  
    this._router.post('/workstation/create', async (req: Request, res: Response) => {
      const workstation: WorkstationEntity = req.body as WorkstationEntity;
      res.status(200).json(await this.workstationService.createdWorkstation(workstation));
    });

    // update workstation
    this._router.put('/workstation/:workstationId/Update', async (req: Request, res: Response) => {
      res.status(200).json(await this.workstationService.updatedWorkstation(req,res))
    });


    //  delete workstation
    this._router.delete('/workstation/:workstationId', async (req, res) => {
      res.status(200).json(await this.workstationService.deletedWorkstation(req,res))
    });
  }

  get router(): Router {
    return this._router;
  }
}
