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
exports.removeLike = exports.getAllLikedVideos = exports.likeVideoById = void 0;
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const likeVideoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.likesService.likeVideoById(req.params.videoId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.created(result);
});
exports.likeVideoById = likeVideoById;
const getAllLikedVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.likesService.getAllLikedVideos(req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.getAllLikedVideos = getAllLikedVideos;
const removeLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.likesService.removeLike(req.params.videoId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.removeLike = removeLike;
//# sourceMappingURL=likes.js.map