import { Response } from "express";
import { ServiceResponse } from "../serviceResponses/ServiceResponse";

export class ControllerResponse {
  public static createServiceErrorResponse(res: Response, serviceResponse: ServiceResponse): Response {
    return res.status(serviceResponse.statusCode).json({ errors: serviceResponse.errors });
  }

  public static createBasicErrorResponse(res: Response, errors: string | any[], statusCode: number): Response {
    if (typeof errors === "string") {
      const temp = [];
      temp.push(errors);
      return res.status(statusCode).json({ errors: temp });
    } else {
      return res.status(statusCode).json({ errors: errors });
    }
  }
}
