import { Router, Response, Request } from 'express';
import { IWorkstationService } from '../service';
import { WorkstationEntity } from '../db';
import { AuthMiddleware } from '../middlewares';
import logger from '../logger';

export class WorkstationController {
  private readonly _router: Router = Router();

  constructor(
    private workstationService: IWorkstationService,
    private authMiddleware: AuthMiddleware
  ) {
    const verifyJWT = this.authMiddleware.verifyJWT;

    this._router.get(
      '/workstation/showall',
      verifyJWT,
      async (req: Request, res: Response) => {
        logger.info('/workstation/showall endpoint accessed');
        res.status(200).json(await this.workstationService.getWorkstations());
      }
    );

    this._router.get(
      '/workstation/:id/locate',
      verifyJWT,
      async (req: Request, res: Response) => {
        logger.info('decoded user_id: ' + req.id);
        const workstationId: number = req.params.id as unknown as number;
        logger.info('/workstation/locate endpoint accessed');
        const result = await this.workstationService.findLocationByWorkstation(
          workstationId
        );
        res.status(200).json([req.id, result]);
      }
    );

    this._router.get(
      '/workstation/:floorId/showonfloor',
      verifyJWT,
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
      verifyJWT,
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
      verifyJWT,
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
      verifyJWT,
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
      verifyJWT,
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
      verifyJWT,

      async (req: Request, res: Response) => {
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
