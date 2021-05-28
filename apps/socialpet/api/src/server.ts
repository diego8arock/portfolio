import express, { Request, Response } from "express";

class Server {
  private app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    this.app.set("port", process.env.PORT || 3000);
  }

  public routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("SocialPet API running...");
    });
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listening ${this.app.get("port")} port.`);
    });
  }
}

const server = new Server();
server.start();
