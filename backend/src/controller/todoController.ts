import { Todo } from 'db/models/todo';
import { Router } from 'express';
import { ITodoService } from '../service';

export class TodoController {
  private readonly _router: Router = Router();

  constructor(private todoService: ITodoService) {
    this._router.get('/todos', async (req, res) => {
      res.json(await this.todoService.getTodos());
    });

    this._router.post('/todos', async (req, res) => {
      const todo: Todo = req.body as Todo;
      res.json(await this.todoService.createTodo(todo));
    });
  }

  get router(): Router {
    return this._router;
  }
}
