import { FloorEntity } from 'db';
import { IFloorService } from '../service';
import { Router, Response, Request } from 'express';
import { AuthMiddleware } from '../middlewares';

export class FloorController {
  private readonly _router: Router = Router();

  constructor(private floorService: IFloorService,
    private authMiddleware: AuthMiddleware) {
    const verifyJWT = this.authMiddleware.verifyJWT;

    this._router.get('/floor/showall',verifyJWT, async (req: Request, res: Response) => {
      res.status(200).json(await this.floorService.getFloors());
    });

    this._router.get('/building-floor',verifyJWT, async (req: Request, res: Response) => {
      const buildingIdQuery = req.query.buildingId;
      if (buildingIdQuery === undefined) {
        res.status(400).json({
          error: 'Building was not selected',
        });
      } else {
        const buildingId = parseInt(buildingIdQuery as string, 10);
        res
          .status(200)
          .json(await this.floorService.showFloorInBuilding(buildingId));
      }
    });

    this._router.post('/floor/create',verifyJWT, async (req: Request, res: Response) => {
      const buildingIdQuery = req.query.buildingId;
      if (buildingIdQuery === undefined) {
        res.status(400).json({
          error: 'Building was not selected',
        });
      } else {
        const floor: FloorEntity = req.body as FloorEntity;
        const buildingId = parseInt(buildingIdQuery as string, 10);
        res
          .status(200)
          .json(await this.floorService.createFloor(floor, buildingId));
      }
    });

    this._router.put(
      '/floor/:floorId/update',verifyJWT,
      async (req: Request, res: Response) => {
        const floor: FloorEntity = req.body as FloorEntity;
        const floorId = parseInt(req.params.floorId, 10);
        res
          .status(200)
          .json(await this.floorService.updateFloor(floorId, floor));
      }
    );

    this._router.delete(
      '/floor/:floorId/delete',verifyJWT,
      async (req: Request, res: Response) => {
        const floorId = parseInt(req.params.floorId, 10);
        res.status(200).json(await this.floorService.deleteFloor(floorId));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}
