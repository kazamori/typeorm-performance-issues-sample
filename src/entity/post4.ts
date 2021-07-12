import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attach } from "./attach";
import { Base } from "./base";
import { Category4 } from "./category4";
import { User } from "./user";

@Entity()
export class Post4 extends Base<Post4> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => Category4, {
    nullable: true,
    eager: true,
  })
  @JoinTable()
  categories: Category4[];

  @ManyToOne((type) => User, (user) => user.posts4)
  user: User;

  @OneToOne((type) => Attach, (attach) => attach.post4, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  attach: Attach;
}
