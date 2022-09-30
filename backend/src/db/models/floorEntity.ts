import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,} from 'typeorm';
import { BuildingEntity } from './buildingEntity';

@Entity('floor')
export class FloorEntity {
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

  @ManyToOne(() => BuildingEntity, building => building.floor)
  @JoinColumn({ name: 'building_id' })
  building?: BuildingEntity;
}