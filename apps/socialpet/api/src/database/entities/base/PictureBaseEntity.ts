import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class PictureBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "empty" })
  fileName!: string;

  @Column()
  description!: string;

  @Column({ type: "datetime" })
  date!: Date;

  @Column({ default: true })
  isActive!: boolean;
}
