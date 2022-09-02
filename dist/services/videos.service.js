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
const models_1 = require("../models");
const getAllVideos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield models_1.Video.find();
        return { success: true, data: { videos } };
    }
    catch (err) {
        return { success: false, data: { err }, status: 500 };
    }
});
const getVideoById = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield models_1.Video.findById(videoId);
        if (!video)
            throw { status: 404, message: "Video not found" };
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
exports.default = { getAllVideos, getVideoById };
//# sourceMappingURL=videos.service.js.map