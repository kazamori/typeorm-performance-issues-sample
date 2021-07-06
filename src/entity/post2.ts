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
import { Category } from "./category";
import { User } from "./user";

@Entity()
export class Post2 extends Base<Post2> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => Category, (category) => category.posts2, {
    nullable: true,
    lazy: true,
  })
  @JoinTable()
  categories: Promise<Category[]>;

  @ManyToOne((type) => User, (user) => user.posts2)
  user: User;

  @OneToOne((type) => Attach, (attach) => attach.post2, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  attach: Promise<Attach>;
}
