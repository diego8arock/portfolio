import { EntityRepository, Repository } from "typeorm";
import { UserPictureEntity } from "../entities/UserPictureEntity";

@EntityRepository(UserPictureEntity)
export class UserPictureRepository extends Repository<UserPictureEntity> {}
