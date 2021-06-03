import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "../entities/PostEntity";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {}
