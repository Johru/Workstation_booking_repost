import { FloorController } from '../controller';
import { Router } from 'express';
import { BuildingRepository, FloorRepository, UserRepository } from '../repository';
import { FloorService, UserService } from '../service';
import { AuthMiddleware } from '../middlewares';

const floorRouter = Router();

const floorRepository = new FloorRepository();
const buildingRepository = new BuildingRepository();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authMiddleware = new AuthMiddleware(userService)
const floorService = new FloorService(floorRepository, buildingRepository);
const floorController = new FloorController(floorService,authMiddleware);

floorRouter.use('/api', floorController.router);

export { floorRouter };
