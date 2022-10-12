import { FloorEntity } from 'db';
import { IFloorService } from '../service';
import { Router, Response, Request } from 'express';

export class FloorController {
  private readonly _router: Router = Router();

  constructor(private floorService: IFloorService) {
    this._router.get('/floor/showall', async (req: Request, res: Response) => {
      res.status(200).json(await this.floorService.getFloors());
    });

    this._router.get('/building-floor', async (req: Request, res: Response) => {
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

    this._router.post('/floor/create', async (req: Request, res: Response) => {
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
      '/floor/:floorId/update',
      async (req: Request, res: Response) => {
        const floor: FloorEntity = req.body as FloorEntity;
        const floorId = parseInt(req.params.floorId, 10);
        res
          .status(200)
          .json(await this.floorService.updateFloor(floorId, floor));
      }
    );

    this._router.delete(
      '/floor/:floorId/delete',
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
