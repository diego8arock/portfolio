import { PostEntity } from "../../../database/entities/PostEntity";
import { UserEntity } from "../../../database/entities/UserEntity";
import { HttpRequestCodes } from "../../HttpResponseCodes";
import { PostServiceResponse } from "./PostServiceResponse";
import { RequestServiceResponse } from "./RequestServiceResponse";
import { ServiceResponse } from "./ServiceResponse";
import { UserServiceResponse } from "./UserServiceResponse";

export class ServiceResponseFactory {
  public static createDefaultServiceResponse() {
    return new ServiceResponse(true, [], HttpRequestCodes.OK);
  }

  public static createDefaultUserServiceResponse() {
    return new UserServiceResponse(true, [], HttpRequestCodes.OK, new UserEntity());
  }

  public static createDefaultPostServiceResponse() {
    return new PostServiceResponse(true, [], HttpRequestCodes.OK, new PostEntity());
  }

  public static createDefaultRequestServiceResponse() {
    return new RequestServiceResponse(true, [], HttpRequestCodes.OK, []);
  }
}
