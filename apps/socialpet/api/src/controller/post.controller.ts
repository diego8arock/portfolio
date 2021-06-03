import { Router, Request, Response } from "express";
import Logger from "../../lib/logger";
import { PostEntity } from "../database/entities/PostEntity";
import { auth } from "../middleware/Authenticator";
import { postAddPostValdationRules, postModiyPostValdationRules, validate } from "../middleware/Validator";
import { PostSerivce } from "../services/post.service";
import { UserService } from "../services/user.service";
import { HttpRequestCodes } from "../util/HttpResponseCodes";
import { ControllerResponse as cr } from "../util/responses/controllerResponses/ControllerResponse";

export class PostController {
  public router: Router;
  private userService: UserService;
  private postService: PostSerivce;
  constructor() {
    this.router = Router();
    this.router.use(auth);
    this.userService = new UserService();
    this.postService = new PostSerivce();
    this.routes();
  }

  public addPost = async (req: Request, res: Response) => {
    try {
      const message = req.body.message;

      let userServiceResponse = await this.userService.findById(req.user.id);

      if (!userServiceResponse.success) {
        return cr.createServiceErrorResponse(res, userServiceResponse);
      }

      const post = new PostEntity();
      post.message = message;
      post.user = userServiceResponse.user;

      let postServiceResponse = await this.postService.create(post);
      if (!postServiceResponse.success) {
        return cr.createServiceErrorResponse(res, postServiceResponse);
      }

      return res.status(HttpRequestCodes.CREATED).send();
    } catch (error) {
      Logger.error(error);
      return res.status(HttpRequestCodes.SERVER_ERROR).send({ errors: ["Server error"] });
    }
  };

  public modifyPost = async (req: Request, res: Response) => {
    try {
      const { postId, message } = req.body;
      const postServiceResponse = await this.postService.findById(postId);

      if (!postServiceResponse.success) {
        return cr.createServiceErrorResponse(res, postServiceResponse);
      }

      const post = postServiceResponse.post;
      post.message = message;
      const serviceResponse = await this.postService.update(post);

      if (!serviceResponse.success) {
        return cr.createServiceErrorResponse(res, serviceResponse);
      }

      return res.status(HttpRequestCodes.OK).send();
    } catch (error) {
      Logger.error(error);
      return res.status(HttpRequestCodes.SERVER_ERROR).send({ errors: ["Server error"] });
    }
  };

  public routes() {
    this.router.post("/", postAddPostValdationRules(), validate, this.addPost);
    this.router.put("/", postModiyPostValdationRules(), validate, this.modifyPost);
  }
}
