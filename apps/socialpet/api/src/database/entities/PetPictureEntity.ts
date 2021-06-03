import { Entity, ManyToOne } from "typeorm";
import { PictureBaseEntity } from "./base/PictureBaseEntity";
import { PetEntity } from "./PetEntity";

@Entity({ name: "petpictures" })
export class PetPictureEntity extends PictureBaseEntity {
  @ManyToOne(() => PetEntity, (pet) => pet.pictures, { nullable: false })
  pet!: PetEntity;
}
