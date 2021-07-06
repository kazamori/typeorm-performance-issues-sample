import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base";
import { Post1 } from "./post1";
import { Post2 } from "./post2";
import { Post3 } from "./post3";
import { Post4 } from "./post4";

@Entity()
export class Attach extends Base<Attach> {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Post1, (post) => post.attach, {
    nullable: true,
  })
  post1: Post1;

  @OneToOne((type) => Post2, (post) => post.attach, {
    nullable: true,
  })
  post2: Post2;

  @OneToOne((type) => Post3, (post) => post.attach, {
    nullable: true,
  })
  post3: Post3;

  @OneToOne((type) => Post4, (post) => post.attach, {
    nullable: true,
  })
  post4: Post4;

  @Column("text", { default: "" })
  attr: string;
}
