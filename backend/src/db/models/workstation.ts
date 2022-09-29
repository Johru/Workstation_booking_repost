import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,OneToMany,} from 'typeorm';
import { BuildingTable } from './building';
import { FloorTable } from './floor';
import { SeatTable } from './seat';
import { BoolBitTransformer } from './transformer';

@Entity('workstation')
export class WorkstationEntity {
  @PrimaryGeneratedColumn()
  workstation_id?: number;

  @Column()
  floor_id?: number;

  @Column()
  workstation_name?: string;
  @Column({
    name: 'workstation_isactive',
    type: 'bit',
    default: true,
    transformer: new BoolBitTransformer(),
  })
  workstation_isactive?: boolean;

  @ManyToOne(() => FloorTable, floor => floor.workstation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'floor_id' })
  floor?: FloorTable;

  @OneToMany(() => SeatTable, seat => seat.workstation)
  seat?: SeatTable[];
}