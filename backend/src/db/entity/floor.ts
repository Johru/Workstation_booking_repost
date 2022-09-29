import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BuildingEntity } from './buildingEntity';
import { WorkstationTable } from './workstation';

@Entity('floor')
export class FloorTable {
  @PrimaryGeneratedColumn()
  floor_id?: number;

  @Column()
  building_id?: number;

  @Column()
  floor_name?: string;
  @Column()
  floor_capacity?: number;
  @Column()
  floor_plan?: string;

  @ManyToOne(() => BuildingEntity, building => building.floor, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'building_id' })
  building?: BuildingEntity;

  @OneToMany(() => WorkstationTable, workstation => workstation.floor)
  workstation?: WorkstationTable[];
}
