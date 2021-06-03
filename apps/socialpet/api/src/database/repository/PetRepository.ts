import { EntityRepository, Repository } from "typeorm";
import { PetEntity } from "../entities/PetEntity";

@EntityRepository(PetEntity)
export class PetRepository extends Repository<PetEntity> {}
