import { Router } from 'express';
import { BuildingService } from 'service/building/buildingService';

export class BuildingController {
  private readonly _router: Router = Router();

  constructor(private buildingService: BuildingService) {
    this._router.get('/building/cities', async (req: any, res: any) => {
      console.log('/building/cities endpoint accessed');
      res.json(await buildingService.listCities());
    });

    this._router.get('/building', async (req: any, res: any) => {
      console.log('/building endpoint accessed');
      res.json(await buildingService.listBuildings());
    });

    this._router.get('/building/:id/edit', async (req: any, res: any) => {
      console.log('/building/edit/:id endpoint accessed');
      res.json(await buildingService.singleBuilding(req.params.id));
    });

    this._router.post('/building/new', async (req: any, res: any) => {
      console.log('/building/new endpoint accessed');
      const body = req.body;
      res.json(await buildingService.addNewBuilding(body));
    });

    this._router.put('/building/:id/edit', async (req: any, res: any) => {
      console.log('/building/:id/edit endpoint accessed');
      const body = req.body;
      res.json(await buildingService.updateBuilding(body, req.params.id));
    });

    this._router.delete('/building/:id/delete', async (req: any, res: any) => {
      console.log('/building/delete/:id endpoint accessed');
      const buildingId = req.params.id;
      res.json(await buildingService.deleteBuilding(buildingId));
    });
  }

  get router(): Router {
    return this._router;
  }
}
