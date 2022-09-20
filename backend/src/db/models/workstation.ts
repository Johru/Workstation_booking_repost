import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workstation {
  @PrimaryGeneratedColumn()
  workstation_id?: number;

  @Column('int')
  floor_id?: number;

  @Column('text')
  workstation_name?: string;

  @Column({ type: 'boolean', default: true })
  workstation_isactive?: boolean;
}
