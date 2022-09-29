import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { WorkstationEntity } from './workstationEntity';

@Entity('seat')
export class SeatTable {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @Column()
  workstation_id?: number;

  @ManyToOne(() => WorkstationEntity, workstation => workstation.seat, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workstation_id' })
  workstation?: WorkstationEntity;
}
