import { Request, Response } from "express";
import { ResponseWrapper, responseObject } from "../helpers";
import { historyService } from "../services";

export const getHistory = async (req: Request, res: Response) => {
  const result: responseObject = await historyService.getAllVideos(
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};

export const addHistory = async (req: Request, res: Response) => {
  const result: responseObject = await historyService.addHistory(
    req.params.videoId,
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.created(result);
};