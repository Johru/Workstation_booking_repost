import { appDataSource } from '../db';
import { Todo } from '../db/models/todo';

export interface ITodoRepository {
  findAllTodos(): Promise<Todo[]>;
  saveTodo(todo: Todo): Promise<Todo>;
}

export class TodoRepository implements ITodoRepository {
  async findAllTodos(): Promise<Todo[]> {
    console.log('repo: ' + appDataSource.getRepository(Todo).find());
    return appDataSource.getRepository(Todo).find();
  }

  saveTodo(todo: Todo): Promise<Todo> {
    const todoToSave = new Todo();
    todoToSave.name = todo.name;
    todoToSave.description = todo.description;
    todoToSave.dueDate = todo.dueDate;

    return appDataSource.getRepository(Todo).save(todoToSave);
  }
}
