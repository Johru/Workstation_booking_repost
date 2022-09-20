import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @Column('int')
  workstation_id?: number;
}
