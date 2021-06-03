import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { PetPictureEntity } from "./PetPictureEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "pets" })
export class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.pets, { nullable: false })
  user!: UserEntity;

  @Column()
  name!: string;

  @Column()
  specie!: string;

  @Column()
  breed!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => PetPictureEntity, (pp) => pp.pet)
  pictures!: PetPictureEntity[];
}
