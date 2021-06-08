import { RequestEntity } from "../../../database/entities/RequestEntity";
import { ServiceResponse } from "./ServiceResponse";

export class RequestServiceResponse extends ServiceResponse {
  public requests: RequestEntity[];
  constructor(success: boolean, errors: any[], statusCode: number, requests: RequestEntity[]) {
    super(success, errors, statusCode);
    this.requests = requests;
  }
}
