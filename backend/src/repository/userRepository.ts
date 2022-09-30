import { appDataSource } from '../db';
import { UserEntity } from '../db';

export class UserRepository {
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
}
