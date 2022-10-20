import { Router, Response, Request } from 'express';
import { IWorkstationService } from '../service';
import { WorkstationEntity } from '../db';
import { AuthMiddleware } from 'middlewares';

export class WorkstationController {
  private readonly _router: Router = Router();

  constructor(private workstationService: IWorkstationService,
    private authMiddleware: AuthMiddleware) {

    const verifyJWT = this.authMiddleware.verifyJWT;

    this._router.get(
      '/workstation/showall',verifyJWT,
      async (req: Request, res: Response) => {
        res.status(200).json(await this.workstationService.getWorkstations());
      }
    );

    this._router.get(
      '/workstation/:floorId/showonfloor',verifyJWT,
      async (req: Request, res: Response) => {
        const floorId = parseInt(req.params.floorId, 10);
        res
          .status(200)
          .json(await this.workstationService.showWorkstationOnFloor(floorId));
      }
    );

    this._router.post(
      '/workstation/create/:seats',verifyJWT,
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
      '/workstation/:workstationId/update',verifyJWT,
      async (req: Request, res: Response) => {
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
      '/workstation/:workstationId/active',verifyJWT,
      async (req: Request, res: Response) => {
        const workstationId = parseInt(req.params.workstationId, 10);
        res
          .status(200)
          .json(
            await this.workstationService.setWorkstationToActive(workstationId)
          );
      }
    );

    this._router.put(
      '/workstation/:workstationId/notactive',verifyJWT,
      async (req: Request, res: Response) => {
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
      '/workstation/:workstationId/delete',verifyJWT,
      async (req: Request, res: Response) => {
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
