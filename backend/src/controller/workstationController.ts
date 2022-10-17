import { Router, Response, Request } from 'express';
import { IWorkstationService } from '../service';
import { WorkstationEntity } from '../db';
import logger from '../logger';

export class WorkstationController {
  private readonly _router: Router = Router();

  constructor(private workstationService: IWorkstationService) {
    this._router.get(
      '/workstation/showall',
      async (req: Request, res: Response) => {
        logger.info('/workstation/showall endpoint accessed');
        res.status(200).json(await this.workstationService.getWorkstations());
      }
    );

    this._router.get(
      '/workstation/:floorId/showonfloor',
      async (req: Request, res: Response) => {
        const floorId = parseInt(req.params.floorId, 10);
        logger.info('/workstation/:floorId/showonfloor endpoint accessed');
        res
          .status(200)
          .json(await this.workstationService.showWorkstationOnFloor(floorId));
      }
    );

    this._router.post(
      '/workstation/create/:seats',
      async (req: Request, res: Response) => {
        logger.info('/workstation/create/:seats endpoint accessed');
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
        logger.info('/workstation/:workstationId/update endpoint accessed');
        const workstationId = parseInt(req.params.workstationId, 10);
        const workstation: WorkstationEntity = req.body as WorkstationEntity;
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

    this._router.put(
      '/workstation/:workstationId/active',
      async (req: Request, res: Response) => {
        logger.info('/workstation/:workstationId/active endpoint accessed');
        const workstationId = parseInt(req.params.workstationId, 10);
        res
          .status(200)
          .json(
            await this.workstationService.setWorkstationToActive(workstationId)
          );
      }
    );

    this._router.put(
      '/workstation/:workstationId/notactive',
      async (req: Request, res: Response) => {
        logger.info('/workstation/:workstationId/notactive endpoint accessed');
        const workstationId = parseInt(req.params.workstationId, 10);
        res
          .status(200)
          .json(
            await this.workstationService.setWorkstationToInActive(
              workstationId
            )
          );
      }
    );

    this._router.delete(
      '/workstation/:workstationId/delete',
      async (req, res) => {
        logger.info('/workstation/:workstationId/delete endpoint accessed');
        const workstationId = parseInt(req.params.workstationId, 10);
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
