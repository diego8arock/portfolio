import chai from "chai";
import chaiHttp from "chai-http";
import { UserRepository } from "../src/database/repository/UserRepository";

import { getConnection } from "typeorm";
import app from "../src/server";

let requester: ChaiHttp.Agent;

before((done) => {
  requester = chai.request(app).keepOpen();
  setTimeout(async () => {
    console.log("Cleaning DB");
    const connection = getConnection("default");
    await connection.getCustomRepository(UserRepository).clear();
    console.log("DB Clean");
    done();
  }, 2000);
});

after(() => {
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});
