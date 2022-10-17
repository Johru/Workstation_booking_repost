import { FloorController } from '../controller';
import { Router } from 'express';
import { BuildingRepository, FloorRepository } from '../repository';
import { FloorService } from '../service';

const floorRouter = Router();

const floorRepository = new FloorRepository();
const buildingRepository = new BuildingRepository();
const floorService = new FloorService(floorRepository, buildingRepository);
const floorController = new FloorController(floorService);

floorRouter.use('/api', floorController.router);

export { floorRouter };
