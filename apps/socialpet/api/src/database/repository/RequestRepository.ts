import { EntityRepository, Repository } from "typeorm";
import { RequestEntity } from "../entities/RequestEntity";

@EntityRepository(RequestEntity)
export class RequestRepository extends Repository<RequestEntity> {}
