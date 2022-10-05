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

  @Column()
  workstation_id?: number;

  @ManyToOne(() => WorkstationEntity, workstation => workstation.seat)
  @JoinColumn({ name: 'workstation_id' })
  workstation?: WorkstationEntity;
}
