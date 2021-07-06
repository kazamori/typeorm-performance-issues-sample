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
export class Post3 extends Base<Post3> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => Category, (category) => category.posts3, {
    nullable: true,
    eager: true,
  })
  @JoinTable()
  categories: Category[];

  @ManyToOne((type) => User, (user) => user.posts3)
  user: User;

  @OneToOne((type) => Attach, (attach) => attach.post3, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  attach: Attach;
}
