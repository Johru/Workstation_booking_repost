import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SeatTable } from './seat';
import { UserTable } from './user';
import { BoolBitTransformer } from './transformer';
import { BuildingTable } from './building';

@Entity('floor')
export class FloorTable {
  @PrimaryGeneratedColumn()
  floor_id?: number;

  @Column()
  building_id?: number;

  @Column()
  floor_name?: string;

  @Column({ type: 'date' })
  reservation_date?: Date;

  @Column({
    name: 'reservation_isconfirmed',
    type: 'bit',
    default: false,
    transformer: new BoolBitTransformer(),
  })
  reservation_isconfirmed?: boolean;

  @ManyToOne(() => BuildingTable, building => building.floor)
  @JoinColumn({ name: 'building_id' })
  building?: BuildingTable;
}
