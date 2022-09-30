import { UserEntity } from '../../db';
import { UserRepository } from '../../repository';

export class UserService {
  constructor(public userRepository: UserRepository) {}
  listUsers(): Promise<UserEntity[]> {
    return this.userRepository.listUsers();
  }
}
