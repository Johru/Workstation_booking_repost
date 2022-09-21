import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReservationTable } from './reservation';

@Entity('seat')
export class SeatTable {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @Column()
  workstation_id?: number;

  @OneToMany(() => ReservationTable, reservation => reservation.seat)
  reservation?: ReservationTable[];
}
