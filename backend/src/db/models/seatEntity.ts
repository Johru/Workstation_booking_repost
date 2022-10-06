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
export class SeatEntity {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @ManyToOne(() => WorkstationEntity, workstation => workstation.seats, {
    onDelete: 'CASCADE',
  })
  workstation?: WorkstationEntity;
}
