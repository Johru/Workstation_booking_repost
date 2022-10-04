import { appDataSource } from '../db';
import { UserEntity } from '../db';
import { Success } from './success';
import { logErrorAndReturnYesOrNo } from './logErrorAndReturnYesOrNo';

export interface IUserRepository {
  listUsers(): Promise<UserEntity[]>;
  deleteUser(reservationId: number): Promise<Success>;
  promoteUserToAdmin(userId: number): Promise<Success>;
  demoteUserFromAdmin(userId: number): Promise<Success>;
  blockUser(userId: number): Promise<Success>;
  unblockUser(userId: number): Promise<Success>;
}

export class UserRepository implements IUserRepository {
  async listUsers(): Promise<UserEntity[]> {
    return appDataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .select([
        'user.user_id',
        'user.user_name',
        'user.user_login',
        'user.user_isadmin',
        'user.user_isblocked',
      ])
      .loadRelationCountAndMap('user.reservationCount', 'user.reservation')
      .getMany();
  }

  async deleteUser(userId: number): Promise<Success> {
    const deletion = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('user_id=:userId', {
        userId: userId,
      })
      .execute();

    return logErrorAndReturnYesOrNo(deletion, 'User');
  }

  async promoteUserToAdmin(userId: number): Promise<Success> {
    const promotion = await appDataSource
      .getRepository(UserEntity)
      .update(userId, {
        user_isadmin: true,
      });

    return logErrorAndReturnYesOrNo(promotion, 'User');
  }

  async demoteUserFromAdmin(userId: number): Promise<Success> {
    const demotion = await appDataSource
      .getRepository(UserEntity)
      .update(userId, {
        user_isadmin: false,
      });

    return logErrorAndReturnYesOrNo(demotion, 'User');
  }

  async blockUser(userId: number): Promise<Success> {
    const block = await appDataSource.getRepository(UserEntity).update(userId, {
      user_isblocked: true,
    });

    return logErrorAndReturnYesOrNo(block, 'User');
  }

  async unblockUser(userId: number): Promise<Success> {
    const unblock = await appDataSource
      .getRepository(UserEntity)
      .update(userId, {
        user_isblocked: false,
      });
    return logErrorAndReturnYesOrNo(unblock, 'User');
  }
}
