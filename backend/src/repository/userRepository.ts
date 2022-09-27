import { appDataSource } from '../db';
import { UserTable } from '../db/models/user';

export class UserRepository {
  async listUsers(): Promise<any[]> {
    return appDataSource
      .getRepository(UserTable)
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
