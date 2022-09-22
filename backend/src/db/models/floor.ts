import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Floor {
  @PrimaryGeneratedColumn()
  floor_id?: number;

  @Column('number')
  building_id?: number;

  @Column('text')
  floor_name?: string;

  @Column('datetime')
  floor_capacity?: number;

  @Column('text')
  floor_plan?: string;
}
