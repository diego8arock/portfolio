import { EntityRepository, Repository } from "typeorm";
import { CommentEntity } from "../entities/CommentEntity";

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {}
