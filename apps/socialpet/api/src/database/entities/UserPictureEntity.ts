import { PictureBaseEntity } from "./base/PictureBaseEntity";
import { UserEntity } from "./UserEntity";
import { Entity } from "typeorm";

@Entity({ name: "userpictures" })
export class UserPictureEntity extends PictureBaseEntity {
  user!: UserEntity;
}
