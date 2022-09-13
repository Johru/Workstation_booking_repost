import { Todo } from '../../db';
import { ITodoRepository } from '../../repository';
import { todoSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface ITodoService {
  getTodos(): Promise<Todo[]>;
  createTodo(todo: Todo): Promise<{ status: string; message: string[] }>;
}

export class TodoService implements ITodoService {
  constructor(private todoRepository: ITodoRepository) {}

  async getTodos(): Promise<Todo[]> {
    return await this.todoRepository.findAllTodos();
  }

  async createTodo(todo: Todo): Promise<{ status: string; message: string[] }> {
    try {
      const value = await todoSchema.validateAsync(todo);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newTodo = await this.todoRepository.saveTodo(todo);

    return {
      status: 'OK',
      message: [`Todo is succesfully saved with id: ${newTodo.id}`],
    };
  }
}
