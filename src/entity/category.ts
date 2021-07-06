import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base";
import { Post1 } from "./post1";
import { Post2 } from "./post2";
import { Post3 } from "./post3";

@Entity()
export class Category extends Base<Category> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  name: String;

  @ManyToMany((type) => Post1, (post) => post.categories, {
    nullable: true,
    lazy: true,
  })
  posts1: Promise<Post1[]>;

  @ManyToMany((type) => Post2, (post) => post.categories, {
    nullable: true,
    lazy: true,
  })
  posts2: Promise<Post2[]>;

  @ManyToMany((type) => Post3, (post) => post.categories, {
    nullable: true,
    lazy: true,
  })
  posts3: Promise<Post3[]>;
}
