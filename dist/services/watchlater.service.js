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
const getLaterVideos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoArray = yield models_1.WatchLater.find({
            user: new mongoose_1.Types.ObjectId(userId),
        })
            .populate("video")
            .select("-user -_id");
        const watchlater = videoArray.map((item) => item.video);
        return { success: true, data: { watchlater } };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const addToLater = (videoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateWatchLater)({ video: videoId });
        if (error)
            throw { status: 400, message: error.details[0].message };
        if (!(0, mongoose_1.isValidObjectId)(videoId))
            throw { status: 400, message: "Invalid video id" };
        //~ Check if video exists
        const video = yield models_1.Video.findById(videoId);
        if (!video)
            throw { message: "Video not found", status: 404 };
        //~ Check if the video is already in watch later
        const laterVideo = yield models_1.WatchLater.findOne({
            video: new mongoose_1.Types.ObjectId(videoId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        if (laterVideo)
            throw { message: "Video already added to watch later", status: 400 };
        //~ Create a new like
        const newVideo = new models_1.WatchLater({
            video: new mongoose_1.Types.ObjectId(videoId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        yield newVideo.save();
        return { success: true, data: { video } };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const removeLater = (videoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateWatchLater)({ video: videoId });
        if (error)
            throw { status: 400, message: error.details[0].message };
        if (!(0, mongoose_1.isValidObjectId)(videoId))
            throw { status: 400, message: "Invalid video id" };
        //~ Check if video exists
        const video = yield models_1.Video.findById(videoId);
        if (!video)
            throw { message: "Video not found", status: 404 };
        //~ Remove the video from watchlater
        yield models_1.WatchLater.deleteOne({
            video: new mongoose_1.Types.ObjectId(videoId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        return yield getLaterVideos(userId); //~ return the updated list of watchlater videos
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
exports.default = { getLaterVideos, addToLater, removeLater };
//# sourceMappingURL=watchlater.service.js.map