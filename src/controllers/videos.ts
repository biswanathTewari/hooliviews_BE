import { Request, Response } from "express";
import { ResponseWrapper, responseObject } from "../helpers";
import { videosService } from "../services";

export const getAllVideos = async (_, res: Response) => {
  const result: responseObject = await videosService.getAllVideos();
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};

export const getVideoById = async (req: Request, res: Response) => {
  const result: responseObject = await videosService.getVideoById(
    req.params.id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
