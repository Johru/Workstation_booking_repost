import { BuildingController } from '../controller';
import { Router } from 'express';
import { BuildingRepository } from '../repository/buildingRepository';
import { BuildingService } from '../service/building/buildingService';

const buildingRouter = Router();

const buildingRepository = new BuildingRepository();
const buildingService = new BuildingService(buildingRepository);
const buildingController = new BuildingController(buildingService);

buildingRouter.use('/api', buildingController.router);

export { buildingRouter };
