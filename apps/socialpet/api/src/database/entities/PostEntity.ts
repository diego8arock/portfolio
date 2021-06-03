import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { CommentEntity } from "./CommentEntity";
import { LikeEntity } from "./LikeEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "posts" })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  message!: string;

  @Column({ type: "datetime" })
  date!: Date;

  @ManyToOne(() => UserEntity, (user) => user.likes, { nullable: false })
  user!: UserEntity;

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes!: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments!: CommentEntity[];

  @Column({ default: true })
  isActive!: boolean;
}
