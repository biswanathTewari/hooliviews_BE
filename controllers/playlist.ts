import { Request, Response } from "express";
import { ResponseWrapper, responseObject } from "../helpers";
import { playlistService } from "../services";

const createPlaylist = async (req: Request, res: Response) => {
  const { title, description = "" } = req.body;

  const result: responseObject = await playlistService.createPlaylist(
    title,
    description,
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.created(result);
};

export { createPlaylist };
