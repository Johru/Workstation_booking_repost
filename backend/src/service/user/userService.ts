import { ValidationError } from 'joi';

import { UserEntity } from '../../db';
import { UserRepository } from '../../repository';
import { Success } from '../../repository/success';
import { userSchema } from './userSchema';
import logger from '../../logger';

export class UserService {
  constructor(public userRepository: UserRepository) {}
  listUsers(): Promise<UserEntity[]> {
    return this.userRepository.listUsers();
  }

  async createUser(
    user: UserEntity
  ): Promise<{ status: string; message: string[] }> {
    try {
      await userSchema.validateAsync(user);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newUser = await this.userRepository.createUser(user);

    return {
      status: 'OK',
      message: [`User is succesfully saved with userID: ${newUser.user_id}`],
    };
  }

  async findUserByEmail(email: string): Promise<boolean> {
    const users = await this.userRepository.findUserByEmail(email);
    return users.length as unknown as boolean;
  }

  async findUserByLogin(login: string): Promise<boolean> {
    const users = await this.userRepository.findUserByLogin(login);
    return users.length as unknown as boolean;
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
