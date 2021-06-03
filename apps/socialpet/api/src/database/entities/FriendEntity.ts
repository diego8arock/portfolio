import { Entity, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "friends" })
export class FriendEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((type) => UserEntity, { nullable: false })
  @JoinColumn()
  user!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.friends, { nullable: false })
  friend!: UserEntity;

  @Column({ default: true })
  isActive!: boolean;
}
