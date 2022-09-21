import { SeatTable } from '../db';

import { todoSchema } from './todo/schema';
import { ValidationError } from 'joi';
import logger from '../logger';
import { SeatRepository } from '../repository';

export class SeatService {
  constructor(public seatRepository: SeatRepository) {}

  getSeats(): Promise<SeatTable[]> {
    return this.seatRepository.getAllSeats();
  }

  // async createTodo(todo: SeatTable): Promise<{ status: string; message: string[] }> {
  //   try {
  //     const value = await todoSchema.validateAsync(todo);
  //   } catch (error) {
  //     if (error instanceof ValidationError) {
  //       logger.error(error);
  //       const { details } = error;
  //       const errorMessage = details.map(ve => ve.message);
  //       return { status: 'Error', message: errorMessage };
  //     }
  //   }

  // const newTodo = await this.todoRepository.saveTodo(todo);

  // return {
  //   status: 'OK',
  //   message: [`Todo is succesfully saved with id: ${newTodo.id}`],
  // };
  // }
}
