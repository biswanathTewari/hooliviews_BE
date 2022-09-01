import { Request, Response } from "express";
import { ResponseWrapper, responseObject } from "../helpers";
import { playlistService } from "../services";

const getPlaylists = async (req: Request, res: Response) => {
  const result: responseObject = await playlistService.getPlaylists(
    req.user._id
  );
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};

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

export { createPlaylist, getPlaylists };
