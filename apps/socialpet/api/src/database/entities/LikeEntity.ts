import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PostEntity } from "./PostEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "likes" })
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.likes, { nullable: false })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes, { nullable: false })
  post!: PostEntity;

  @Column({ default: true })
  isActive!: boolean;
}
