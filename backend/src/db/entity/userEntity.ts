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
  user_login?: string;

  @Column()
  user_password?: string;

  @Column()
  user_email?: string;

  @Column({
    name: 'user_isadmin',
    type: 'bit',
    default: false,
    transformer: new BoolBitTransformer(),
  })
  readonly user_isadmin?: boolean;

<<<<<<<< HEAD:backend/src/db/entity/user.ts
  @Column({
    name: 'user_isblocked',
    type: 'bit',
    default: false,
    transformer: new BoolBitTransformer(),
  })
  readonly user_isblocked?: boolean;

  @OneToMany(() => ReservationTable, reservation => reservation.user)
  reservation?: ReservationTable[];
========
  @OneToMany(() => ReservationEntity, reservation => reservation.user)
  reservation?: ReservationEntity[];
>>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a:backend/src/db/entity/userEntity.ts
}
