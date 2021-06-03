import { EntityRepository, Repository } from "typeorm";
import { FriendEntity } from "../entities/FriendEntity";

@EntityRepository(FriendEntity)
export class FriendRepository extends Repository<FriendEntity> {}
