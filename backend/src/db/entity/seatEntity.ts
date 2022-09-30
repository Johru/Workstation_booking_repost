import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ReservationEntity, WorkstationEntity } from '../index';

@Entity('seat')
export class SeatEntity {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @Column()
  workstation_id?: number;

  @OneToMany(() => ReservationEntity, reservation => reservation.seat)
  reservation?: ReservationEntity[];

  @ManyToOne(() => WorkstationEntity, workstation => workstation.seat, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workstation_id' })
  workstation?: WorkstationEntity;
}
