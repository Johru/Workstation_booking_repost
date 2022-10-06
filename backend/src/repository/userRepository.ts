import { appDataSource } from '../db';
import { UserEntity } from '../db';
import { determineSuccess } from './determineSuccess';
import { Success } from './success';
import { genSaltSync, hashSync } from 'bcrypt';

export interface IUserRepository {
  listUsers(): Promise<UserEntity[]>;
  createUser(user: UserEntity): Promise<UserEntity>;
  deleteUser(reservationId: number): Promise<Success>;
  findUserByEmail(email: string): Promise<UserEntity[]>;
  findUserByLogin(login: string): Promise<UserEntity[]>;
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

  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = new UserEntity();

    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(user.user_password!, salt);

    newUser.user_name = user.user_name;
    newUser.user_login = user.user_login;
    newUser.user_password = hash;
    newUser.user_email = user.user_email;

    return appDataSource.getRepository(UserEntity).save(newUser);
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

    return determineSuccess(deletion);
  }

  async findUserByEmail(email: string): Promise<UserEntity[]> {
    return appDataSource
      .getRepository(UserEntity)
      .find({ where: { user_email: email } });
  }

  async findUserByLogin(login: string): Promise<UserEntity[]> {
    return appDataSource
      .getRepository(UserEntity)
      .find({ where: { user_login: login } });
  }

  async promoteUserToAdmin(userId: number): Promise<Success> {
    const promotion = await appDataSource
      .getRepository(UserEntity)
      .update(userId, {
        user_isadmin: true,
      });

    return determineSuccess(promotion);
  }

  async demoteUserFromAdmin(userId: number): Promise<Success> {
    const demotion = await appDataSource
      .getRepository(UserEntity)
      .update(userId, {
        user_isadmin: false,
      });

    return determineSuccess(demotion);
  }

  async blockUser(userId: number): Promise<Success> {
    const block = await appDataSource.getRepository(UserEntity).update(userId, {
      user_isblocked: true,
    });

    return determineSuccess(block);
  }

  async unblockUser(userId: number): Promise<Success> {
    const unblock = await appDataSource
      .getRepository(UserEntity)
      .update(userId, {
        user_isblocked: false,
      });
    return determineSuccess(unblock);
  }
}
