import { Router, Response, Request } from 'express';
import { IWorkstationService } from '../service';
import { WorkstationEntity } from '../db/models/workstationEntity';

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
        var floorId = parseInt(req.params.floorId, 10);
        res
          .status(200)
          .json(await this.workstationService.showWorkstationOnFloor(floorId));
      }
    );

    this._router.post(
      '/workstation/create/:seats',
      async (req: Request, res: Response) => {
        const workstation: WorkstationEntity = req.body as WorkstationEntity;
        let seatsNumber = parseInt(req.params.seats, 10);

        if (!req.params.seats) {
          seatsNumber = 1;
        }
        res
          .status(200)
          .json(
            await this.workstationService.createWorkstation(
              workstation,
              seatsNumber
            )
          );
      }
    );

    this._router.put(
      '/workstation/:workstationId/update',
      async (req: Request, res: Response) => {
        var workstationId = parseInt(req.params.workstationId, 10);
        const workstation: WorkstationEntity = req.body as WorkstationEntity;
        //
        res
          .status(200)
          .json(
            await this.workstationService.updateWorkstation(
              workstationId,
              workstation
            )
          );
      }
    );

    this._router.delete(
      '/workstation/:workstationId/delete',
      async (req, res) => {
        var workstationId = parseInt(req.params.workstationId, 10);
        res
          .status(200)
          .json(await this.workstationService.deleteWorkstation(workstationId));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}
