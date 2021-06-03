import { EntityRepository, Repository } from "typeorm";
import { LikeEntity } from "../entities/LikeEntity";

@EntityRepository(LikeEntity)
export class LikeRepository extends Repository<LikeEntity> {}
