import { UserEntity } from "../../../database/entities/UserEntity";
import { ServiceResponse } from "./ServiceResponse";
import { UserServiceResponse } from "./UserServiceResponse";

export class ServiceResponseFactory {
  public static createDefaultServiceResponse() {
    return new ServiceResponse(true, [], 200);
  }

  public static createDefaultUserServiceResponse() {
    return new UserServiceResponse(true, [], 200, new UserEntity());
  }
}
