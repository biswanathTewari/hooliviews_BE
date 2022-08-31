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

export const addToLater = async (req: Request, res: Response) => {
  const result: responseObject = await watchlaterService.addToLater(
    req.params.videoId,
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.created(result);
};

export const removeFromLater = async (req: Request, res: Response) => {
  const result: responseObject = await watchlaterService.removeLater(
    req.params.videoId,
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
