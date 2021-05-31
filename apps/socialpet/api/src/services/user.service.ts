import { getConnection } from "typeorm";
import { UserEntity } from "../database/entities/UserEntity";
import { UserRepository } from "../database/repository/UserRepository";
import { HttpRequestCodes } from "../util/HttpResponseCodes";
import { ServiceResponse } from "../util/responses/ServiceResponse";
import { ServiceResponseFactory } from "../util/responses/ServiceResponseFactory";
import { UserServiceResponse } from "../util/responses/UserServiceResponse";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository =
      getConnection("default").getCustomRepository(UserRepository);
  }

  public isEmailUnique = async (email: string): Promise<ServiceResponse> => {
    let response = ServiceResponseFactory.createDefaultServiceResponse();
    try {
      const userCount = await this.userRepository.count({ email: email });
      if (userCount != 0) {
        response.setError(
          `User with email ${email} already exists`,
          HttpRequestCodes.BAD_REQUEST
        );
      }
    } catch (error) {
      console.log(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };

  public save = async (user: UserEntity): Promise<ServiceResponse> => {
    let response = ServiceResponseFactory.createDefaultServiceResponse();
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };
}
