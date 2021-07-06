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
  RelationId,
} from "typeorm";
import { Attach } from "./attach";
import { Base } from "./base";
import { Category } from "./category";
import { User } from "./user";

@Entity()
export class Post1 extends Base<Post1> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => Category, (category) => category.posts1, {
    nullable: true,
    lazy: true,
  })
  @JoinTable()
  categories: Promise<Category[]>;

  @RelationId((post: Post1) => post.categories)
  categoryIds: number[];

  @ManyToOne((type) => User, (user) => user.posts1)
  user: User;

  @RelationId((post: Post1) => post.user)
  userId: number;

  @OneToOne((type) => Attach, (attach) => attach.post1, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  attach: Promise<Attach>;
}
