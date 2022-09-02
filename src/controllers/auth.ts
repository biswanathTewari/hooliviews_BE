import { Request, Response } from "express";
import { ResponseWrapper, responseObject } from "../helpers";
import { authService } from "../services";

export const signUpUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result: responseObject = await authService.signUp({ email, password });
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.created(result);
};

export const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result: responseObject = await authService.login({ email, password });
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
