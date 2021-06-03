import chai from "chai";
import chaiHttp from "chai-http";
import { UserRepository } from "../src/database/repository/UserRepository";
import { PostRepository } from "../src/database/repository/PostRepository";
import { CommentRepository } from "../src/database/repository/CommentRepository";
import { LikeRepository } from "../src/database/repository/LikeRepository";
import { PetRepository } from "../src/database/repository/PetRepository";
import { RequestRepository } from "../src/database/repository/RequestRepository";
import { FriendRepository } from "../src/database/repository/FriendRepository";
import { PetPictureRepository } from "../src/database/repository/PetPictureRepository";
import { UserPictureRepository } from "../src/database/repository/UserPictureRepository";
import { getConnection } from "typeorm";
import app from "../src/server";

let requester: ChaiHttp.Agent;

before((done) => {
  requester = chai.request(app).keepOpen();
  setTimeout(async () => {
    console.log("Cleaning DB");
    try {
      const connection = getConnection("default");
      await connection.getCustomRepository(UserPictureRepository).delete({});
      await connection.getCustomRepository(PetPictureRepository).delete({});
      await connection.getCustomRepository(FriendRepository).delete({});
      await connection.getCustomRepository(RequestRepository).delete({});
      await connection.getCustomRepository(PetRepository).delete({});
      await connection.getCustomRepository(LikeRepository).delete({});
      await connection.getCustomRepository(CommentRepository).delete({});
      await connection.getCustomRepository(PostRepository).delete({});
      await connection.getCustomRepository(UserRepository).delete({});
      //await connection.close();
    } catch (error) {
      console.log(`Error cleaning DB: ${error}`);
      process.exit(1);
    }
    console.log("DB Clean");
    done();
  }, 2000);
});

after(() => {
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});
