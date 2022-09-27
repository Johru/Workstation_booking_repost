import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReservationTable } from './reservation';
import { BoolBitTransformer } from './transformer';

@Entity('user')
export class UserTable {
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

  @Column({
    name: 'user_isblocked',
    type: 'bit',
    default: false,
    transformer: new BoolBitTransformer(),
  })
  readonly user_isblocked?: boolean;

  @OneToMany(() => ReservationTable, reservation => reservation.user)
  reservation?: ReservationTable[];
}
