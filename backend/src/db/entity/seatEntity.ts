import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReservationEntity } from '../index';

@Entity('seat')
export class SeatEntity {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @Column()
  workstation_id?: number;

  @OneToMany(() => ReservationEntity, reservation => reservation.seat)
  reservation?: ReservationEntity[];
}
