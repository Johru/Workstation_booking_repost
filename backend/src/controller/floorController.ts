import { FloorEntity } from 'db';
import { appDataSource } from '../db/connection';
import { IFloorService } from '../service';
import { Router, Response, Request } from 'express';


export class FloorController {
  private readonly _router: Router = Router();

  constructor(private floorService: IFloorService) {
    this._router.get('/floor/showall', async (req: Request, res: Response) => {
    res.status(200).json(await this.floorService.getFloors());
    });

    this._router.post('/floor/create', async (req: Request, res: Response) => {
    const floor: FloorEntity = req.body as FloorEntity;
    res.status(200).json(await this.floorService.createFloor(floor));
    });


    this._router.put('/floor/:floorId/update', async (req: Request, res: Response) => {
    res.status(200).json(await this.floorService.updatedFloor(req, res));
    });

    this._router.delete('/floor/:floorId/delete', async (req: Request, res: Response) => {
    res.status(200).json(await this.floorService.deletedFloor(req, res));
    });

  }

  get router(): Router {
    return this._router;
  }
}
