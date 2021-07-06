import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base";
import { User } from "./user";

@Entity()
export class Comment extends Base<Comment> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  comment: string;

  @ManyToOne((type) => User)
  user: User;
}
