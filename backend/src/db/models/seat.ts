import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { WorkstationTable } from './workstation';

@Entity('seat')
export class SeatTable {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @Column()
  workstation_id?: number;

  @ManyToOne(() => WorkstationTable, workstation => workstation.seat, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workstation_id' })
  workstation?: WorkstationTable;
}
