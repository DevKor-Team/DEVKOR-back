import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Mbti, Position, Role } from './users.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  major: string;

  @Column({ type: 'date', default: null })
  birthDay: Date;

  @Column()
  github: string;

  @Column()
  blog: string;

  @Column()
  introduction: string;

  @Column()
  hobby: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'enum', enum: Position, default: Position.Newbie })
  position: Position;

  @Column({ type: 'enum', enum: Mbti, default: null })
  mbti: Mbti;

  @Column({ type: 'timestamp' })
  createdDate: Timestamp;

  @Column({ type: 'timestamp' })
  updatedDate: Timestamp;

  @Column({ type: 'timestamp' })
  deletedDate: Timestamp;
}
