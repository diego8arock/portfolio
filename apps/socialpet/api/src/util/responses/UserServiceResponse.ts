import { UserEntity } from "../../database/entities/UserEntity";
import { ServiceResponse } from "./ServiceResponse";

export class UserServiceResponse extends ServiceResponse {
  public user: UserEntity;
  constructor(
    success: boolean,
    errors: any[],
    statusCode: number,
    user: UserEntity
  ) {
    super(success, errors, statusCode);
    this.user = user;
  }
}
