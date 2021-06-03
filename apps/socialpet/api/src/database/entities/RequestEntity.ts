import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "requests" })
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.requests, { nullable: false })
  user!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.requests, { nullable: false })
  recipient!: UserEntity;

  @Column({ default: true })
  isActive!: boolean;
}
