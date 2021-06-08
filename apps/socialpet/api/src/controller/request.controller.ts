import { Router, Request, Response } from "express";
import Logger from "../../lib/logger";
import { UserEntity } from "../database/entities/UserEntity";
import { auth } from "../middleware/Authenticator";
import { RequestService } from "../services/request.service";
import { UserService } from "../services/user.service";
import { HttpRequestCodes } from "../util/HttpResponseCodes";
import { ControllerResponse as cr } from "../util/responses/controllerResponses/ControllerResponse";

export class RequestController {
  public router: Router;
  private requestService: RequestService;
  private userService: UserService;
  constructor() {
    this.requestService = new RequestService();
    this.userService = new UserService();
    this.router = Router();
    this.router.use(auth);
    this.routes();
  }

  public getAllRequests = async (req: Request, res: Response) => {
    try {
      const user = new UserEntity();
      user.id = req.user.id;
      const requestServiceResponse = await this.requestService.findAllByUser(user);
      if (!requestServiceResponse.success) {
        return cr.createServiceErrorResponse(res, requestServiceResponse);
      }
      const response: { name: string }[] = [];
      requestServiceResponse.requests.forEach((r) => {
        response.push({
          name: r.user.getFullName(),
        });
      });
      return res.status(HttpRequestCodes.OK).json(JSON.stringify(response));
    } catch (error) {
      Logger.error(error);
      return res.status(HttpRequestCodes.SERVER_ERROR).send({ errors: ["Server error"] });
    }
  };

  public sendRequest = async (req: Request, res: Response) => {
    try {
      const recipientId = req.body.recipientId;
      const userServiceResponse = await this.userService.findById(recipientId);
      if (!userServiceResponse.success) {
        return cr.createServiceErrorResponse(res, userServiceResponse);
      }
      const userSenderServiceResponse = await this.userService.findById(req.user.id);
      if (!userSenderServiceResponse.success) {
        return cr.createServiceErrorResponse(res, userSenderServiceResponse);
      }
      const requestServiceResponse = await this.requestService.addRequest(
        userSenderServiceResponse.user,
        userServiceResponse.user
      );
      if (!requestServiceResponse.success) {
        return cr.createServiceErrorResponse(res, requestServiceResponse);
      }
      return res.status(HttpRequestCodes.OK).send();
    } catch (error) {
      Logger.error(error);
      return res.status(HttpRequestCodes.SERVER_ERROR).send({ errors: ["Server error"] });
    }
  };

  public acceptRequest = async (req: Request, res: Response) => {
    try {
      const requestId = req.body.requestId;
      const requestServiceResponse = await this.requestService.findById(requestId);
      if (!requestServiceResponse.success) {
        return cr.createServiceErrorResponse(res, requestServiceResponse);
      }
      const serviceResponse = await this.requestService.updateActiveToFalse(requestServiceResponse.requests[0]);
      if (!serviceResponse.success) {
        return cr.createServiceErrorResponse(res, serviceResponse);
      }
      return res.status(HttpRequestCodes.OK).send();
    } catch (error) {
      Logger.error(error);
      return res.status(HttpRequestCodes.SERVER_ERROR).send({ errors: ["Server error"] });
    }
  };

  public denyOrDeleteRequest = async (req: Request, res: Response) => {
    try {
      const requestId = req.body.requestId;
      const requestServiceResponse = await this.requestService.findById(requestId);
      if (!requestServiceResponse.success) {
        return cr.createServiceErrorResponse(res, requestServiceResponse);
      }
      const serviceResponse = await this.requestService.updateActiveToFalse(requestServiceResponse.requests[0]);
      if (!serviceResponse.success) {
        return cr.createServiceErrorResponse(res, serviceResponse);
      }
      return res.status(HttpRequestCodes.OK).send();
    } catch (error) {
      Logger.error(error);
      return res.status(HttpRequestCodes.SERVER_ERROR).send({ errors: ["Server error"] });
    }
  };

  public routes() {}
}
