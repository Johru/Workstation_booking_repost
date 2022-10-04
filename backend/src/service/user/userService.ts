import { UserEntity } from '../../db';
import { UserRepository } from '../../repository';
import { Success } from '../../repository/success';
import { idSchema } from '../index';
import { yesOrNo } from '../index';

export class UserService {
  constructor(public userRepository: UserRepository) {}
  listUsers(): Promise<UserEntity[]> {
    return this.userRepository.listUsers();
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
