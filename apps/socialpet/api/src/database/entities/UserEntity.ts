import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
