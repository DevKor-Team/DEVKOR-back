import { User } from 'aws-sdk/clients/budgets';
import { Users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tech {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  //   @Column()
  //   tag: Category[];

  @Column()
  postGroup: string;

  @Column()
  contents: string;

  @Column()
  likes: number;

  @Column()
  scraps: number;

  //   @Column()
  //   comments: Comment[];

  @ManyToOne(() => Users, (user) => user.techPosts)
  @JoinColumn()
  creator: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
