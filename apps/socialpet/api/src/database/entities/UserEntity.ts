import { Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import { CommentEntity } from "./CommentEntity";
import { FriendEntity } from "./FriendEntity";
import { LikeEntity } from "./LikeEntity";
import { PetEntity } from "./PetEntity";
import { PostEntity } from "./PostEntity";
import { RequestEntity } from "./RequestEntity";
import { UserPictureEntity } from "./UserPictureEntity";

@Entity({ name: "users" })
@Unique(["email"])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => FriendEntity, (friend) => friend.user)
  friends!: FriendEntity[];

  @OneToMany(() => RequestEntity, (request) => request.user)
  requests!: RequestEntity[];

  @OneToMany(() => PostEntity, (post) => post.user)
  posts!: PostEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes!: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments!: CommentEntity[];

  @OneToMany(() => PetEntity, (pet) => pet.user)
  pets!: PetEntity[];

  @OneToMany(() => UserPictureEntity, (up) => up.user)
  pictures!: UserPictureEntity[];

  public getFullName = () => {
    return this.firstName + " " + this.lastName;
  };
}
