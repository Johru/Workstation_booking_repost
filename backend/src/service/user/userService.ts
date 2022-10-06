import { ValidationError } from 'joi';

import { UserEntity } from '../../db';
import { UserRepository } from '../../repository';
import { Success } from '../../repository/success';
import { idSchema } from '../index';
import { yesOrNo } from '../index';
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

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const users = await this.userRepository.findUserByEmail(email);
    return users;
  }

  async findUserByLogin(login: string): Promise<UserEntity | null> {
    const users = await this.userRepository.findUserByLogin(login);
    return users;
  }

  async deleteUser(id: number): Promise<Success> {
    const validation = await yesOrNo(idSchema, id);
    if (!validation) return { success: 'no' };
    return this.userRepository.deleteUser(id);
  }

  async promoteUserToAdmin(id: number): Promise<Success> {
    const validation = await yesOrNo(idSchema, id);
    if (!validation) return { success: 'no' };
    return this.userRepository.promoteUserToAdmin(id);
  }

  async demoteUserFromAdmin(id: number): Promise<Success> {
    const validation = await yesOrNo(idSchema, id);
    if (!validation) return { success: 'no' };
    return this.userRepository.demoteUserFromAdmin(id);
  }

  async blockUser(id: number): Promise<Success> {
    const validation = await yesOrNo(idSchema, id);
    if (!validation) return { success: 'no' };
    return this.userRepository.blockUser(id);
  }

  async unblockUser(id: number): Promise<Success> {
    const validation = await yesOrNo(idSchema, id);
    if (!validation) return { success: 'no' };
    return this.userRepository.unblockUser(id);
  }
}
