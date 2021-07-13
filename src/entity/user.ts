import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article";
import { Base } from "./base";
import { Post1 } from "./post1";
import { Post2 } from "./post2";
import { Post3 } from "./post3";
import { Post4 } from "./post4";

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

  @OneToMany((type) => Post4, (post) => post.user, { lazy: true })
  posts4: Promise<Post4[]>;

  @OneToMany((type) => Article, (article) => article.user, { lazy: true })
  article: Promise<Article[]>;
}
