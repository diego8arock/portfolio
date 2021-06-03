import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class PictureBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "empty" })
  fileName!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  modified!: Date;

  @Column({ default: true })
  isActive!: boolean;
}
