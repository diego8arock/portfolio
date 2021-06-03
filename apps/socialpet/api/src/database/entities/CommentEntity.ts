import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PostEntity } from "./PostEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "comments" })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.comments, { nullable: false })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments, { nullable: false })
  post!: PostEntity;

  @Column({ length: 200 })
  message!: string;

  @Column({ type: "date" })
  date!: Date;

  @Column({ default: true })
  isActive!: boolean;
}
