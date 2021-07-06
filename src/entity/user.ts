import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base";
import { Post1 } from "./post1";
import { Post2 } from "./post2";
import { Post3 } from "./post3";

@Entity()
export class User extends Base<User> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  name: string;

  @OneToMany((type) => Post1, (post) => post.user, { lazy: true })
  posts1: Promise<Post1[]>;

  @OneToMany((type) => Post2, (post) => post.user, { lazy: true })
  posts2: Promise<Post2[]>;

  @OneToMany((type) => Post3, (post) => post.user, { lazy: true })
  posts3: Promise<Post3[]>;
}
