import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { UsersController } from "./controller/user.controller";
import dotenv from "dotenv";

class Server {
  private app: express.Application;
  private userController!: UsersController;
  constructor() {
    dotenv.config();
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  public async routes() {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["build/database/entities/**/*.js"],
      synchronize: true,
      logging: process.env.DB_LOGGING?.toLowerCase() == "true",
      name: "default",
      ssl:
        process.env.NODE_ENV == "development"
          ? false
          : { rejectUnauthorized: false },
    });

    this.userController = new UsersController();
    this.app.use("/api/users/", this.userController.router);
    this.app.get("/", (req: Request, res: Response) => {
      res.send("SocialPet API running...");
    });
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(
        `Server is listening ${this.app.get("port")} port on ${
          process.env.NODE_ENV
        } environment.`
      );
    });
  }
}

const server = new Server();
server.start();
