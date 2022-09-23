import { FloorController } from '../controller';
import { Router } from 'express';
import { FloorRepository } from '../repository';
import { FloorService } from '../service';

const router = Router();

const floorRepository = new FloorRepository();
const floorService = new FloorService(floorRepository);
const floorController = new FloorController(floorService);

router.use('/api', floorController.router);

export { router };
