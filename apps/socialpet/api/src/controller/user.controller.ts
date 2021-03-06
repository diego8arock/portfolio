import { Request, Response, Router } from "express";
import { UserEntity } from "../database/entities/UserEntity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { UserService } from "../services/user.service";
import { ServiceResponse } from "../util/responses/serviceResponses/ServiceResponse";
import { HttpRequestCodes } from "../util/HttpResponseCodes";
import { ControllerResponse as cr } from "../util/responses/controllerResponses/ControllerResponse";
import Logger from "../../lib/logger";
import { validate, userSingUpValidatoRules } from "../middleware/Validator";

export class UsersController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  public signUp = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req["body"];

      let serviceResponse = await this.userService.isEmailUnique(email);

      if (!serviceResponse.success) {
        return cr.createServiceErrorResponse(res, serviceResponse);
      }

      let user = new UserEntity();
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;

      // Encrypt password
      const salt = await bcrypt.genSalt(config.get("salt"));

      user.password = await bcrypt.hash(password, salt);

      serviceResponse = await this.userService.create(user);

      if (!serviceResponse.success) {
        return cr.createServiceErrorResponse(res, serviceResponse);
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: config.get("tokenExpiration") }, (error, token) => {
        if (error) throw error;
        return res.status(HttpRequestCodes.CREATED).json({ token });
      });
    } catch (error) {
      Logger.error(error);
      return res.status(HttpRequestCodes.SERVER_ERROR).send({ errors: ["Server error"] });
    }
  };

  public routes() {
    this.router.post("/", userSingUpValidatoRules(), validate, this.signUp);
  }
}
