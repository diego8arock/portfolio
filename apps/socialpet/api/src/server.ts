import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { UsersController } from "./controller/user.controller";
import dotenv from "dotenv";
import Logger from "../lib/logger";
import httpLogger from "../config/httpLogger";

class Server {
  private app: express.Application;
  private userController!: UsersController;
  constructor() {
    if (process.env.NODE_ENV !== "production") dotenv.config();
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.urlencoded({ extended: true }), express.json());
    this.app.use(httpLogger);
  }

  public async routes() {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["build/src/database/entities/**/*.js"],
      synchronize: true,
      logging: process.env.DB_LOGGING?.toLowerCase() == "true",
      name: "default",
      ssl:
        process.env.NODE_ENV == "development"
          ? false
          : { rejectUnauthorized: false },
    });
    Logger.info(`Connection to DB established`);
    this.userController = new UsersController();
    this.app.use("/api/users/", this.userController.router);
    this.app.get("/", (req: Request, res: Response) => {
      res.send("SocialPet API running...");
    });
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      Logger.info(
        `Server is listening ${this.app.get("port")} port on ${
          process.env.NODE_ENV
        } environment.`
      );
    });
  }
}

const server = new Server();
server.start();
