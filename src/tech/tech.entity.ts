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

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  scraps: number;

  //   @Column()
  //   comments: Comment[];

  @ManyToOne(() => Users, (user) => user.techPosts)
  @JoinColumn()
  creator: Users;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
