import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response } from "express";
import { TokenInterface } from "../@types/jwt";
import { HttpRequestCodes } from "../util/HttpResponseCodes";

export function auth(req: Request, res: Response, next: () => any) {
  //Get token from the header
  const token = req.header("X-Auth-Token");

  //Check if  not token
  if (!token) {
    return res.status(HttpRequestCodes.UNAUTHORIZED).json({ msg: "No token, authorization denied" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")) as TokenInterface;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(HttpRequestCodes.UNAUTHORIZED).json({ msg: "Token is not valid" });
  }
}
