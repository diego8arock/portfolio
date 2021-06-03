import { getConnection } from "typeorm";
import Logger from "../../lib/logger";
import { PostEntity } from "../database/entities/PostEntity";
import { PostRepository } from "../database/repository/PostRepository";
import { HttpRequestCodes } from "../util/HttpResponseCodes";
import { PostServiceResponse } from "../util/responses/serviceResponses/PostServiceResponse";
import { ServiceResponse } from "../util/responses/serviceResponses/ServiceResponse";
import { ServiceResponseFactory as srf } from "../util/responses/serviceResponses/ServiceResponseFactory";

export class PostSerivce {
  private postRepository: PostRepository;
  constructor() {
    this.postRepository = getConnection("default").getCustomRepository(PostRepository);
  }

  public findById = async (id: number): Promise<PostServiceResponse> => {
    let response = srf.createDefaultPostServiceResponse();
    try {
      const post = await this.postRepository.findOne({ id: id });
      if (post) response.post = post;
      else response.setError(`Post with id ${id} was not found`, HttpRequestCodes.RESOURCE_NOT_FOUND);
    } catch (error) {
      Logger.error(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };

  public create = async (post: PostEntity): Promise<ServiceResponse> => {
    let response = srf.createDefaultServiceResponse();
    try {
      await this.postRepository.save(post);
    } catch (error) {
      Logger.error(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };

  public update = async (post: PostEntity): Promise<ServiceResponse> => {
    let response = srf.createDefaultServiceResponse();
    try {
      await this.postRepository.save(post);
    } catch (error) {
      Logger.error(error);
      response.setError(error, HttpRequestCodes.SERVER_ERROR);
    }
    return response;
  };
}
