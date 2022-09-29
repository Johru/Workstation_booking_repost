import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReservationEntity } from '../index';
import { BoolBitTransformer } from './transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column()
  user_name?: string;

  @Column()
  seat_login?: string;

  @Column()
  user_password?: string;

  @Column()
  user_email?: string;

  @Column({
    name: 'user_isadmin',
    type: 'bit',
    transformer: new BoolBitTransformer(),
  })
  readonly user_isadmin?: boolean;

  @OneToMany(() => ReservationEntity, reservation => reservation.user)
  reservation?: ReservationEntity[];
}
