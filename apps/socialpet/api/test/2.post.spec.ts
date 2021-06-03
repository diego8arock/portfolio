import chai from "chai";
import chaiHttp from "chai-http";
import { PostRepository } from "../src/database/repository/PostRepository";
import { getConnection } from "typeorm";
import app from "../src/server";
import { userMain } from "./data";
import { PostEntity } from "../src/database/entities/PostEntity";

chai.should();
chai.use(chaiHttp);

describe("/POST create new post", () => {
  it("it should return 201", async () => {
    let res = await chai.request(app).post("/api/auth").send(userMain);
    const token = res.body.token;
    res = await chai.request(app).post("/api/posts").set("x-auth-token", token).send({ message: "test post" });
    console.log(res.body);
    res.should.have.status(201);
  });
});

describe("/POST modify post", () => {
  it("it should return 201", async () => {
    let res = await chai.request(app).post("/api/auth").send(userMain);
    const token = res.body.token;
    await chai.request(app).post("/api/posts").set("x-auth-token", token).send({ message: "test post 2" });
    const connection = getConnection("default");
    const post = await connection.getRepository(PostEntity).createQueryBuilder().orderBy("id", "DESC").getOne();
    console.log(`postId: ${post?.id}`);
    res = await chai
      .request(app)
      .put("/api/posts")
      .set("x-auth-token", token)
      .send({ postId: post?.id, message: "test post 2 modified" });
    console.log(res.body);
    res.should.have.status(200);
  });
});
