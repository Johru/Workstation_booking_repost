import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn, OneToMany
  } from 'typeorm';
  import { BuildingTable } from './building';
  import { WorkstationEntity } from './workstationEntity';
  
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
  
    @ManyToOne(() => BuildingTable, building => building.floor)
    @JoinColumn({ name: 'building_id' })
    building?: BuildingTable;
    
    @OneToMany(() => WorkstationEntity, (workstation) => workstation.floor)
    workstation?: WorkstationEntity[];
  }