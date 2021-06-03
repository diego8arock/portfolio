import { getConnection } from "typeorm";
import { UserEntity } from "../database/entities/UserEntity";
import { UserRepository } from "../database/repository/UserRepository";
import { HttpRequestCodes } from "../util/HttpResponseCodes";
import { ServiceResponse } from "../util/responses/serviceResponses/ServiceResponse";
import { ServiceResponseFactory as srf } from "../util/responses/serviceResponses/ServiceResponseFactory";
import { UserServiceResponse } from "../util/responses/serviceResponses/UserServiceResponse";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = getConnection("default").getCustomRepository(UserRepository);
  }

  public isEmailUnique = async (email: string): Promise<ServiceResponse> => {
    let response = srf.createDefaultServiceResponse();
    try {
      const userCount = await this.userRepository.count({ email: email });
      if (userCount != 0) {
        response.setError(`User with email ${email} already exists`, HttpRequestCodes.BAD_REQUEST);
      }
    } catch (error) {
      console.log(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };

  public findByEmail = async (email: string): Promise<UserServiceResponse> => {
    const response = srf.createDefaultUserServiceResponse();
    try {
      const user = await this.userRepository.findOne({ email: email });
      if (user) response.user = user;
      else response.setError(`User with email ${email} was not found`, HttpRequestCodes.RESOURCE_NOT_FOUND);
    } catch (error) {
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };

  public save = async (user: UserEntity): Promise<ServiceResponse> => {
    let response = srf.createDefaultServiceResponse();
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };
}
