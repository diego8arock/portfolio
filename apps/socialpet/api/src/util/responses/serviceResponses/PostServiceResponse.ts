import { PostEntity } from "../../../database/entities/PostEntity";
import { ServiceResponse } from "./ServiceResponse";

export class PostServiceResponse extends ServiceResponse {
  public post: PostEntity;
  constructor(success: boolean, errors: any[], statusCode: number, post: PostEntity) {
    super(success, errors, statusCode);
    this.post = post;
  }
}
