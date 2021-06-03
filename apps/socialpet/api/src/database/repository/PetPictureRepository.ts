import { EntityRepository, Repository } from "typeorm";
import { PetPictureEntity } from "../entities/PetPictureEntity";

@EntityRepository(PetPictureEntity)
export class PetPictureRepository extends Repository<PetPictureEntity> {}
