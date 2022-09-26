import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SeatTable } from './seat';
import { UserTable } from './user';
import { BoolBitTransformer } from './transformer';

@Entity('reservation')
export class ReservationTable {
  @PrimaryGeneratedColumn()
  reservation_id?: number;

  @Column()
  user_id?: number;

  @Column()
  seat_id?: number;

  @Column({ type: 'date' })
  reservation_date?: Date;

  @ManyToOne(() => SeatTable, seat => seat.reservation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seat_id' })
  seat?: SeatTable;
  @ManyToOne(() => UserTable, user => user.reservation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: UserTable;
}
