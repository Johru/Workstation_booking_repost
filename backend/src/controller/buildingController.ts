import { Router, Response, Request } from 'express';
import { BuildingService } from '../service';
import logger from '../logger';

export class BuildingController {
  private readonly _router: Router = Router();

  constructor(private buildingService: BuildingService) {
    this._router.get(
      '/building/cities',
      async (req: Request, res: Response) => {
        logger.info('/building/cities endpoint accessed');
        res.json(await this.buildingService.listCities());
      }
    );

    this._router.get('/building', async (req: Request, res: Response) => {
      logger.info('/building endpoint accessed');
      res.json(await this.buildingService.listBuildings());
    });

    this._router.get('/building/:id', async (req: Request, res: Response) => {
      const buildingId = req.params.id as unknown as number;
      logger.info('/building/:id endpoint accessed');
      res.json(await this.buildingService.getSingleBuilding(buildingId));
    });

    this._router.post('/building/new', async (req: Request, res: Response) => {
      logger.info('/building/new endpoint accessed');
      const requestBody = req.body;
      res.json(await this.buildingService.addNewBuilding(requestBody));
    });

    this._router.put(
      '/building/:id/edit',
      async (req: Request, res: Response) => {
        logger.info('//building/:id/edit endpoint accessed');
        const requestBody = req.body;
        const buildingId = req.params.id as unknown as number;
        res.json(
          await this.buildingService.updateBuilding(requestBody, buildingId)
        );
      }
    );

    this._router.delete(
      '/building/:id/delete',
      async (req: Request, res: Response) => {
        logger.info('/building/:id/delete endpoint accessed');
        const buildingId = req.params.id as unknown as number;
        res.json(await this.buildingService.deleteBuilding(buildingId));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}
