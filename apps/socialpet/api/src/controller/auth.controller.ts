import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Logger from "../../lib/logger";
import { authLoginValidationRules, validate } from "../middleware/Validator";
import { UserService } from "../services/user.service";
import { HttpRequestCodes } from "../util/HttpResponseCodes";
import { ControllerResponse as cr } from "../util/responses/controllerResponses/ControllerResponse";
import config from "config";

export class Auth {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.router = Router();
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req["body"];

      const serviceResponse = await this.userService.findByEmail(email);

      if (!serviceResponse.success) {
        return cr.createServiceErrorResponse(res, serviceResponse);
      }

      const user = serviceResponse.user;
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return cr.createBasicErrorResponse(res, `User password is incorrect`, HttpRequestCodes.UNAUTHORIZED);
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: config.get("tokenExpiration") }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      Logger.error(error);
      return res.status(HttpRequestCodes.SERVER_ERROR).send({ errors: ["Server error"] });
    }
  };

  public routes() {
    this.router.post("/", authLoginValidationRules(), validate, this.login);
  }
}
