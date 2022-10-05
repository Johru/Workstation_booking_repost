import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('building')
export class BuildingEntity {
  @PrimaryGeneratedColumn()
  building_id?: number;

  @Column()
  building_name?: string;
  @Column()
  building_address?: string;
  @Column()
  building_zip?: string;
  @Column()
  building_city?: string;
  @Column()
  building_image?: string;

  @OneToMany(() => BuildingEntity, floor => floor.building_id)
  floor?: BuildingEntity[];
}
