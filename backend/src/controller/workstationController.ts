import { appDataSource } from '../db/connection';
import { Router, Response, Request } from 'express';
import { resourceLimits } from 'worker_threads';
import { IWorkstationService } from '../service';
import { WorkstationEntity } from '../db/models/workstationEntity';
import { equal } from 'joi';

export class WorkstationController {
  private readonly _router: Router = Router();

  constructor(private workstationService: IWorkstationService) {
   
    this._router.get(
      '/workstation/showall',
      async (req: Request, res: Response) => {
        res.status(200).json(await this.workstationService.getWorkstations());
      }
    );

    
    this._router.get(
      '/workstation/:floorId/showonfloor',
      async (req: Request, res: Response) => {
        res
          .status(200)
          .json(await this.workstationService.showWorkstationOnFloor(req, res));
      }
    );

   
    this._router.post(
      '/workstation/create/:seats',
      async (req: Request, res: Response) => {
        const workstation: WorkstationEntity = req.body as WorkstationEntity;
        const seatsNumber = parseInt(req.params.seats, 10)

        if(!req.params.seats) {
          seatsNumber == 1
        }
        
        res
          .status(200)
          .json(await this.workstationService.createWorkstation(workstation, seatsNumber));
      }
    );

   
    this._router.put(
      '/workstation/:workstationId/update',
      async (req: Request, res: Response) => {
        res
          .status(200)
          .json(await this.workstationService.updatedWorkstation(req, res));
      }
    );

   
    this._router.delete(
      '/workstation/:workstationId/delete',
      async (req, res) => {
        var result = await this.workstationService.deletedWorkstation(req, res);
        if (result) {
          res.status(200).json('success:yes');
        } else {
          res.status(404).json('success:no');
        }
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}
