import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { UsersController } from "./controller/user.controller";
import dotenv from "dotenv";
import Logger from "../lib/logger";
import httpLogger from "../config/httpLogger";
import { Utils as util } from "./util/Utils";

class Server {
  public app: express.Application;
  private userController!: UsersController;

  constructor() {
    if (process.env.NODE_ENV !== "production") dotenv.config();
    this.app = express();
    this.config();
    this.bd().then(() => this.routes());
    Logger.debug(`Server created.`);
  }

  public config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.urlencoded({ extended: true }), express.json());
    this.app.use(httpLogger);
    Logger.debug(`Server configured`);
  }

  public async bd() {
    const dbUrl = process.env.DATABASE_URL!;
    if (!dbUrl) Logger.error("process.env.DATABASE_URL is empty");
    const dbconfig = util.parserDBUrl(dbUrl);
    const entities =
      process.env.NODE_ENV != "test"
        ? ["build/src/database/entities/**/*.js"]
        : [__dirname + "/database/entities/*.ts"];
    Logger.debug(`DB config: ${JSON.stringify(dbconfig)}, entities path: ${entities}`);

    try {
      await createConnection({
        type: "postgres",
        host: dbconfig.host,
        port: dbconfig.port,
        username: dbconfig.username,
        password: dbconfig.password,
        database: dbconfig.database,
        entities: entities,
        synchronize: true,
        logging: dbconfig.logging,
        name: "default",
        ssl: dbconfig.ssl,
      });
      Logger.debug(`Connection to DB established`);
    } catch (error) {
      Logger.error(`Could not connect to DB: ${error}`);
    }
  }

  public routes() {
    this.userController = new UsersController();
    this.app.use("/api/users/", this.userController.router);
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("SocialPet API running...");
    });
    Logger.debug(`Sever routes established`);
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      Logger.debug(`Server is listening ${this.app.get("port")} port on ${process.env.NODE_ENV} environment.`);
    });
  }
}

const server = new Server();
server.start();
export default server.app;
