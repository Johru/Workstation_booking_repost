// import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { FloorEntity } from './floorEntity';

// @Entity('building')
// export class BuildingEntity {
//   @PrimaryGeneratedColumn()
//   building_id?: number;

//   @Column()
//   building_name?: string;
//   @Column()
//   building_address?: string;
//   @Column()
//   building_zip?: string;
//   @Column()
//   building_city?: string;
//   @Column()
//   building_country?: string;
//   @Column()
//   building_image?: string;

//   @OneToMany(() => FloorEntity, floor => floor.building)
//   floor?: FloorEntity[];
// }