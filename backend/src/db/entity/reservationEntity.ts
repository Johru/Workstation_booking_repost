import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SeatEntity, UserEntity } from '../index';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  reservation_id?: number;

  @Column()
  user_id?: number;

  @Column()
  seat_id?: number;

  @Column({ type: 'date' })
  reservation_date?: Date;

  @ManyToOne(() => SeatEntity, seat => seat.reservation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seat_id' })
  seat?: SeatEntity;
  @ManyToOne(() => UserEntity, user => user.reservation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
