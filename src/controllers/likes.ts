import { Request, Response } from "express";
import { ResponseWrapper, responseObject } from "../helpers";
import { likesService } from "../services";

export const likeVideoById = async (req: Request, res: Response) => {
  const result: responseObject = await likesService.likeVideoById(
    req.params.videoId,
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.created(result);
};

export const getAllLikedVideos = async (req: Request, res: Response) => {
  const result: responseObject = await likesService.getAllLikedVideos(
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};

export const removeLike = async (req: Request, res: Response) => {
  const result: responseObject = await likesService.removeLike(
    req.params.videoId,
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
