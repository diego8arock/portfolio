import { Request, Response, Router } from "express";
import { UserEntity } from "../database/entities/UserEntity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { UserService } from "../services/user.service";
import { ServiceResponse } from "../util/responses/ServiceResponse";
import { HttpRequestCodes } from "../util/HttpResponseCodes";

export class UsersController {
  public router: Router;
  private userService: UserService;
  private serviceResponse!: ServiceResponse;

  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  public signUp = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req["body"];

      this.serviceResponse = await this.userService.isEmailUnique(email);

      if (!this.serviceResponse.success) {
        return res
          .status(this.serviceResponse.statusCode)
          .send(this.serviceResponse.errors);
      }

      let user = new UserEntity();
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;

      // Encrypt password
      const salt = await bcrypt.genSalt(config.get("salt"));

      user.password = await bcrypt.hash(password, salt);

      this.serviceResponse = await this.userService.save(user);

      if (!this.serviceResponse.success) {
        return res
          .status(this.serviceResponse.statusCode)
          .send(this.serviceResponse.errors);
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpiration") },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      return res
        .status(HttpRequestCodes.SERVER_ERROR)
        .send({ errors: ["Server error"] });
    }
  };

  public routes() {
    this.router.post("/", this.signUp);
  }
}
