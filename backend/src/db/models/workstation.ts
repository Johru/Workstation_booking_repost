import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { BoolBitTransformer } from './transformer';
import { SeatTable} from './seat';
import { FloorTable } from './floor';


@Entity('workstation')
export class WorkstationTable {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  workstation_id?: number;

  @Column('int')
  floor_id?: number;

  @Column('text')
  workstation_name?: string;

  @Column({ name:'workstation_isactive', type: 'bit', transformer: new BoolBitTransformer})
  workstation_isactive?: boolean = true;


  @ManyToOne(() => FloorTable, floor => floor.workstation)


  @OneToMany(() => SeatTable, (seat) => seat.workstation)
  seat?: SeatTable[];
}
