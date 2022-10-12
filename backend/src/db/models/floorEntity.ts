import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BuildingEntity } from './buildingEntity';
import { WorkstationEntity } from './workstationEntity';

@Entity('floor')
export class FloorEntity {
  @PrimaryGeneratedColumn()
  floor_id?: number;

  @Column()
  floor_name?: string;

  @ManyToOne(() => BuildingEntity, building => building.floor)
  building?: BuildingEntity;

  @OneToMany(() => WorkstationEntity, workstation => workstation.floor)
  workstation?: WorkstationEntity[];
}
