import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FloorTable } from './floor';

@Entity('building')
export class BuildingTable {
  @PrimaryGeneratedColumn()
  building_id?: number;

  @Column()
  building_name?: string;
  @Column()
  building_adress?: string;
  @Column()
  building_zip?: number;
  @Column()
  building_city?: string;
  @Column()
  building_image?: string;

  @OneToMany(() => FloorTable, floor => floor.building)
  floor?: FloorTable[];
}
