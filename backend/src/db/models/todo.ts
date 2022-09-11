import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, type: 'text' })
  name?: string;

  @Column('text')
  description?: string;

  @Column('datetime')
  dueDate?: Date;

  @Column('boolean')
  isDone?: boolean;
}
