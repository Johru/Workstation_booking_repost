import { appDataSource } from '../db';
import { SeatTable } from '../db';

export class SeatRepository {
  getAllSeats(): Promise<SeatTable[]> {
    return appDataSource.getRepository(SeatTable).find();
  }

  // saveTodo(todo: Todo): Promise<Todo> {
  //   const todoToSave = new Todo();
  //   todoToSave.name = todo.name;
  //   todoToSave.description = todo.description;
  //   todoToSave.dueDate = todo.dueDate;

  //   return appDataSource.getRepository(Todo).save(todoToSave);
  // }
}
