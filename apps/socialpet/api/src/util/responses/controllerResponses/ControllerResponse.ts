import { Response } from "express";
import { ServiceResponse } from "../serviceResponses/ServiceResponse";

export class ControllerResponse {
  public static createErrorResponse(
    res: Response,
    serviceResponse: ServiceResponse
  ) {
    return res
      .status(serviceResponse.statusCode)
      .json({ errors: serviceResponse.errors });
  }
}
