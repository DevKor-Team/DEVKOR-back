import { time } from 'console';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Mbti, Position, Role } from './users.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  major: string;

  @Column({ type: 'date', nullable: true })
  birthDay: Date;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  blog: string;

  @Column({ nullable: true })
  introduction: string;

  @Column({ nullable: true })
  hobby: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'enum', enum: Position, default: Position.Newbie })
  position: Position;

  @Column({ type: 'enum', enum: Mbti, default: null })
  mbti: Mbti;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
