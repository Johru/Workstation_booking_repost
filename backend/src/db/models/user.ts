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

  @OneToMany(() => ReservationTable, reservation => reservation.user)
  reservation?: ReservationTable[];
}
