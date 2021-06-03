import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server";
import { userMain } from "./data";

chai.should();
chai.use(chaiHttp);

describe("/GET app runing", () => {
  it("it should return 200", async () => {
    const res = await chai.request(app).get("/");
    res.should.have.status(200);
  });
});

describe("/POST users new sing up", () => {
  it("it should return token", async () => {
    const res = await chai.request(app).post("/api/users").send(userMain);
    console.log(res.body);
    res.should.have.status(201);
    res.body.should.have.property("token");
  });
});

describe("/POST users old sing up", () => {
  it("it should return error 400", async () => {
    const res = await chai.request(app).post("/api/users").send(userMain);
    console.log(res.body);
    res.should.have.status(400);
    res.body.should.have.property("errors");
  });
});
