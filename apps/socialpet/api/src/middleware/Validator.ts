import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { HttpRequestCodes } from "../util/HttpResponseCodes";

export function validate(req: Request, res: Response, next: () => any) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [x: string]: any }[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(HttpRequestCodes.UNPROCESSABLE_ENTITY).json({ errors: extractedErrors });
}

export function userSingUpValidatoRules() {
  return [body("email").isEmail(), body("password").isLength({ min: 8 })];
}

export function authLoginValidationRules() {
  return [body("email").isEmail(), body("password").isLength({ min: 8 })];
}

export function postAddPostValdationRules() {
  return [body("message").exists().isLength({ min: 1, max: 200 })];
}

export function postModiyPostValdationRules() {
  return [body("message").exists().isLength({ min: 1, max: 200 }), body("postId").exists().isNumeric()];
}
