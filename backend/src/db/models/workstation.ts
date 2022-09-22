import { Entity, Column, PrimaryGeneratedColumn, Binary } from 'typeorm';
import { BoolBitTransformer } from './transformer';

@Entity()
export class Workstation {
  @PrimaryGeneratedColumn()
  workstation_id?: number;

  @Column('int')
  floor_id?: number;

  @Column('text')
  workstation_name?: string;

  @Column({ name:'workstation_isactive', type: 'bit', transformer: new BoolBitTransformer})
  workstation_isactive?: boolean = true;
}
