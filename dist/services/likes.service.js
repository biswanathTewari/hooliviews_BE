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
const likeVideoById = (videoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateLikes)({ video: videoId });
        if (error)
            throw { status: 400, message: error.details[0].message };
        if (!(0, mongoose_1.isValidObjectId)(videoId))
            throw { status: 400, message: "Invalid video id" };
        //~ Check if video exists
        const video = yield models_1.Video.findById(videoId);
        if (!video)
            throw { message: "Video not found", status: 404 };
        //~ Check if the user has already liked the video
        const like = yield models_1.Likes.findOne({
            video: new mongoose_1.Types.ObjectId(videoId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        if (like)
            throw { message: "Video already liked", status: 400 };
        //~ Create a new like
        const newLike = new models_1.Likes({
            video: new mongoose_1.Types.ObjectId(videoId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        yield newLike.save();
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
const getAllLikedVideos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likeArray = yield models_1.Likes.find({
            user: new mongoose_1.Types.ObjectId(userId),
        })
            .populate("video")
            .select("-user -_id");
        const likes = likeArray.map((like) => like.video);
        return { success: true, data: { likes } };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const removeLike = (videoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateLikes)({ video: videoId });
        if (error)
            throw { status: 400, message: error.details[0].message };
        if (!(0, mongoose_1.isValidObjectId)(videoId))
            throw { status: 400, message: "Invalid video id" };
        //~ Check if video exists
        const video = yield models_1.Video.findById(videoId);
        if (!video)
            throw { message: "Video not found", status: 404 };
        //~ Remove the liked video
        yield models_1.Likes.deleteOne({
            video: new mongoose_1.Types.ObjectId(videoId),
            user: new mongoose_1.Types.ObjectId(userId),
        });
        return yield getAllLikedVideos(userId); //~ return the updated list of liked videos
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
exports.default = { likeVideoById, getAllLikedVideos, removeLike };
//# sourceMappingURL=likes.service.js.map