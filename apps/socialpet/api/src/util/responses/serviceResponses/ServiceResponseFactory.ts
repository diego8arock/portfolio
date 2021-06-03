import { PostEntity } from "../../../database/entities/PostEntity";
import { UserEntity } from "../../../database/entities/UserEntity";
import { PostServiceResponse } from "./PostServiceResponse";
import { ServiceResponse } from "./ServiceResponse";
import { UserServiceResponse } from "./UserServiceResponse";

export class ServiceResponseFactory {
  public static createDefaultServiceResponse() {
    return new ServiceResponse(true, [], 200);
  }

  public static createDefaultUserServiceResponse() {
    return new UserServiceResponse(true, [], 200, new UserEntity());
  }

  public static createDefaultPostServiceResponse() {
    return new PostServiceResponse(true, [], 200, new PostEntity());
  }
}
