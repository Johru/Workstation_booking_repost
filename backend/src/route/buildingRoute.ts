import { BuildingController } from '../controller';
import { Router } from 'express';
import { BuildingRepository, UserRepository } from '../repository';
import { BuildingService, UserService } from '../service';
import { AuthMiddleware } from '../middlewares';

const buildingRouter = Router();

const buildingRepository = new BuildingRepository();
const buildingService = new BuildingService(buildingRepository);
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authMiddleware = new AuthMiddleware(userService)
const buildingController = new BuildingController(buildingService,authMiddleware);


buildingRouter.use('/api', buildingController.router);

export { buildingRouter };
    