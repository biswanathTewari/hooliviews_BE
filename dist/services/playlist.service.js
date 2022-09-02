"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const getPlaylists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Check if the user exists
        if (!(0, mongoose_1.isValidObjectId)(userId))
            throw { status: 400, message: "Something went wrong" };
        //~ Get all the playlists of the user
        let playlists = yield models_1.Playlist.find({
            user: new mongoose_1.Types.ObjectId(userId),
        })
            .populate("videos.video")
            .select("-user");
        // @ts-ignore
        const newPlaylists = playlists.map((playlist) => {
            // @ts-ignore, replacing videos: [{video,_id}] with videos: [video]
            let videos = playlist.videos.map((obj) => obj.video);
            const myPlaylist = {
                // @ts-ignore, _id comes after saving, from monogose
                _id: playlist._id,
                title: playlist.title,
                description: playlist.description,
                videos: videos,
            };
            return myPlaylist;
        });
        return { success: true, data: { playlists: newPlaylists } };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const createPlaylist = (title, description, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validatePlaylist)({ title, description });
        if (error)
            throw { status: 400, message: error.details[0].message };
        //~ check if a playlist already exists with a given title
        const playlist = yield models_1.Playlist.findOne({
            title,
            user: new mongoose_1.Types.ObjectId(userId),
        });
        if (playlist)
            throw {
                status: 400,
                message: "A playlist already exists, with the given title",
            };
        //~ Create a new playlist
        const newPlaylist = new models_1.Playlist({
            title,
            description,
            user: new mongoose_1.Types.ObjectId(userId),
            playlists: [],
        });
        yield newPlaylist.save();
        return yield getPlaylists(userId);
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const deletePlaylist = (playlistId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Check if the playlist exists
        const playlist = yield models_1.Playlist.findOne({
            _id: new mongoose_1.Types.ObjectId(playlistId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        if (!playlist)
            throw { status: 404, message: "Playlist not found" };
        //~ Delete the playlist
        yield models_1.Playlist.findByIdAndDelete(playlistId);
        return yield getPlaylists(userId);
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const getPlaylist = (playlistId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Check for valid playlistId
        if (!(0, mongoose_1.isValidObjectId)(playlistId))
            throw { status: 400, message: "Something went wrong" };
        //~ Check if the playlist exists
        const playlist = yield models_1.Playlist.findOne({
            _id: new mongoose_1.Types.ObjectId(playlistId),
            user: new mongoose_1.Types.ObjectId(userId),
        })
            .populate("videos.video")
            .select("-user");
        if (!playlist)
            throw { status: 404, message: "Playlist not found" };
        // @ts-ignore, replacing videos: [{video,_id}] with videos: [video]
        let videos = playlist.videos.map((obj) => obj.video);
        const myPlaylist = {
            _id: playlist._id,
            title: playlist.title,
            description: playlist.description,
            videos: videos,
        };
        return { success: true, data: { playlist: myPlaylist } };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const addVideoToPlaylist = (playlistId, videoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Check for valid ids
        if (!(0, mongoose_1.isValidObjectId)(playlistId) || !(0, mongoose_1.isValidObjectId)(videoId))
            throw { status: 400, message: "Something went wrong" };
        //~ Check if the playlist exists
        const playlist = yield models_1.Playlist.findOne({
            _id: new mongoose_1.Types.ObjectId(playlistId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        if (!playlist)
            throw { status: 404, message: "Playlist not found" };
        //~ Check if the video exists
        const videoExists = yield models_1.Video.findOne({
            _id: new mongoose_1.Types.ObjectId(videoId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        if (!videoExists)
            throw { status: 404, message: "Video not found" };
        //~ Check if the video exists in the playlist
        const video = playlist.videos.find((video) => video.video.toString() === videoId);
        if (video)
            throw { status: 400, message: "Video already exists in the playlist" };
        //~ Add the video to the playlist
        // @ts-ignore
        playlist.videos.push({ video: new mongoose_1.Types.ObjectId(videoId) });
        yield playlist.save();
        return yield getPlaylist(playlistId, userId);
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const deleteVideoFromPlaylist = (playlistId, videoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Check for valid ids
        if (!(0, mongoose_1.isValidObjectId)(playlistId) || !(0, mongoose_1.isValidObjectId)(videoId))
            throw { status: 400, message: "Something went wrong" };
        //~ Check if the playlist exists
        const playlist = yield models_1.Playlist.findOne({
            _id: new mongoose_1.Types.ObjectId(playlistId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        if (!playlist)
            throw { status: 404, message: "Playlist not found" };
        //~ Check if the video exists
        const videoExists = yield models_1.Video.findOne({
            _id: new mongoose_1.Types.ObjectId(videoId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        if (!videoExists)
            throw { status: 404, message: "Video not found" };
        //~ Check if the video exists in the playlist
        const video = playlist.videos.find((video) => video.video.toString() == videoId);
        if (!video)
            throw { status: 400, message: "Video not present in the playlist" };
        //~ Delete the video from the playlist
        playlist.videos = playlist.videos.filter((video) => video.video.toString() !== videoId);
        yield playlist.save();
        return yield getPlaylist(playlistId, userId);
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
exports.default = {
    createPlaylist,
    getPlaylists,
    deletePlaylist,
    addVideoToPlaylist,
    getPlaylist,
    deleteVideoFromPlaylist,
};
//# sourceMappingURL=playlist.service.js.map