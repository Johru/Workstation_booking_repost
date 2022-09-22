import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FloorTable } from './floor';

@Entity('building')
export class BuildingTable {
  @PrimaryGeneratedColumn()
  seat_id?: number;

  @Column()
  workstation_id?: number;

  @OneToMany(() => FloorTable, floor => floor.building)
  floor?: FloorTable[];
}
