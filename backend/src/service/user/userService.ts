import { ValidationError } from 'joi';
import logger from '../../logger';
import { UserRepository } from '../../repository/userRepository';
import { UserTable } from '../../db/models/user';

export class UserService {
  constructor(public userRepository: UserRepository) {}
  listUsers(): Promise<any[]> {
    return this.userRepository.listUsers();
  }
}
