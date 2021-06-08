import { getConnection } from "typeorm";
import Logger from "../../lib/logger";
import { RequestEntity } from "../database/entities/RequestEntity";
import { UserEntity } from "../database/entities/UserEntity";
import { RequestRepository } from "../database/repository/RequestRepository";
import { HttpRequestCodes } from "../util/HttpResponseCodes";
import { RequestServiceResponse } from "../util/responses/serviceResponses/RequestServiceResponse";
import { ServiceResponse } from "../util/responses/serviceResponses/ServiceResponse";
import { ServiceResponseFactory as srf } from "../util/responses/serviceResponses/ServiceResponseFactory";

export class RequestService {
  private requestRepository: RequestRepository;
  constructor() {
    this.requestRepository = new RequestRepository();
  }

  public addRequest = async (userSender: UserEntity, userRecipient: UserEntity): Promise<ServiceResponse> => {
    let response = srf.createDefaultServiceResponse();
    try {
      const request = new RequestEntity();
      request.user = userSender;
      request.recipient = userRecipient;
      await this.requestRepository.save(request);
    } catch (error) {
      Logger.error(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };

  public findAllByUser = async (user: UserEntity): Promise<RequestServiceResponse> => {
    let response = srf.createDefaultRequestServiceResponse();
    try {
      const requests = await this.requestRepository
        .createQueryBuilder("request")
        .leftJoinAndSelect("request.recipient", "user")
        .where("request.user = :id", { id: user.id })
        .getMany();
      response.requests = requests;
    } catch (error) {
      Logger.error(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };

  public findById = async (id: number): Promise<RequestServiceResponse> => {
    let response = srf.createDefaultRequestServiceResponse();
    try {
      const request = await this.requestRepository.findOne({ id: id });
      if (request) response.requests.push(request);
      else response.setError("No request was found", HttpRequestCodes.RESOURCE_NOT_FOUND);
    } catch (error) {
      Logger.error(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };

  public updateActiveToFalse = async (request: RequestEntity): Promise<ServiceResponse> => {
    let response = srf.createDefaultServiceResponse();
    try {
      request.isActive = false;
      await this.requestRepository.save(request);
    } catch (error) {
      Logger.error(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };
}
