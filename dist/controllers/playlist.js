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
exports.deleteVideoFromPlaylist = exports.getPlaylist = exports.addVideoToPlaylist = exports.deletePlaylist = exports.getPlaylists = exports.createPlaylist = void 0;
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const getPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.playlistService.getPlaylists(req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.getPlaylists = getPlaylists;
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description = "" } = req.body;
    const result = yield services_1.playlistService.createPlaylist(title, description, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.created(result);
});
exports.createPlaylist = createPlaylist;
const deletePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.playlistService.deletePlaylist(req.params.playlistId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.deletePlaylist = deletePlaylist;
const getPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.playlistService.getPlaylist(req.params.playlistId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.getPlaylist = getPlaylist;
const addVideoToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.playlistService.addVideoToPlaylist(req.params.playlistId, req.params.videoId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.created(result);
});
exports.addVideoToPlaylist = addVideoToPlaylist;
const deleteVideoFromPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.playlistService.deleteVideoFromPlaylist(req.params.playlistId, req.params.videoId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.deleteVideoFromPlaylist = deleteVideoFromPlaylist;
//# sourceMappingURL=playlist.js.map