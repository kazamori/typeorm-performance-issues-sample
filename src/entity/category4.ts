import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base";

@Entity()
export class Category4 extends Base<Category4> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { default: "" })
  name: String;
}
