import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server";
import { userMain } from "./data";

chai.should();
chai.use(chaiHttp);

let requester: ChaiHttp.Agent;

before((done) => {
  requester = chai.request(app).keepOpen();
  setTimeout(() => {
    done();
  }, 2000);
});

describe("/GET ", () => {
  it("it should return 200", async () => {
    const res = await chai.request(app).get("/");
    res.should.have.status(200);
  });
});

describe("/POST users", () => {
  it("it should return token", async () => {
    const res = await chai.request(app).post("/api/users").send(userMain);
    console.log(res.body);
    res.should.have.status(200);
  });
});
