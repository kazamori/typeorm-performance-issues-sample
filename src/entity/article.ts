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
export class Article extends Base<Article> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wordCount: number;

  @Column()
  readMinutes: number;

  @Column("text", { default: "" })
  text1: string;

  @Column("text", { default: "" })
  text2: string;

  @Column("text", { default: "" })
  text3: string;

  @Column("text", { default: "" })
  text4: string;

  @Column("text", { default: "" })
  text5: string;

  @Column("text", { default: "" })
  text6: string;

  @Column("text", { default: "" })
  text7: string;

  @Column("text", { default: "" })
  text8: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => Category, {
    nullable: true,
    lazy: true,
  })
  @JoinTable()
  categories: Promise<Category[]>;

  @ManyToOne((type) => User, {
    nullable: true,
    lazy: true,
  })
  user: Promise<User>;

  @OneToOne((type) => Attach, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  attach: Promise<Attach>;
}
