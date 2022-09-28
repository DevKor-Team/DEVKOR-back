import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role, Major, MBTI, Position } from './users.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'enum', enum: Major, default: Major.CS })
  major: Major;

  @Column()
  studentNo: string;

  @Column()
  birthDay: Date;

  @Column()
  github: string;

  @Column()
  instagram: string;

  @Column()
  blog: string;

  @Column()
  introduction: string;

  @Column({ type: 'enum', enum: Position, default: Position.BE })
  position: Position;

  @Column()
  hobby: string;

  @Column({ type: 'enum', enum: MBTI, default: MBTI.ENFJ })
  mbti: MBTI;

  @Column()
  image: string;
}
