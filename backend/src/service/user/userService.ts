import { UserEntity } from '../../db';
import { UserRepository } from '../../repository';
import { Success } from '../../repository/success';

export class UserService {
  constructor(public userRepository: UserRepository) {}
  listUsers(): Promise<UserEntity[]> {
    return this.userRepository.listUsers();
  }

  deleteUser(id: number): Promise<Success> {
    return this.userRepository.deleteUser(id);
  }
  promoteUserToAdmin(id: number): Promise<Success> {
    return this.userRepository.promoteUserToAdmin(id);
  }
  demoteUserFromAdmin(id: number): Promise<Success> {
    return this.userRepository.demoteUserFromAdmin(id);
  }
  blockUser(id: number): Promise<Success> {
    return this.userRepository.blockUser(id);
  }
  unblockUser(id: number): Promise<Success> {
    return this.userRepository.unblockUser(id);
  }
}
