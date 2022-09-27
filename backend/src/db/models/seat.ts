import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WorkstationTable } from './workstation';

@Entity('seat')
export class SeatTable {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @Column('int')
  workstation_id?: number;

  @ManyToOne(() => WorkstationTable, (workstation) => workstation.seat)

  workstation?: WorkstationTable;
 
}
