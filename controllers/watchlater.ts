import { Request, Response } from "express";
import { ResponseWrapper, responseObject } from "../helpers";
import { watchlaterService } from "../services";

export const getLaterVideos = async (req: Request, res: Response) => {
  const result: responseObject = await watchlaterService.getLaterVideos(
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
