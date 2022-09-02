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
exports.removeFromLater = exports.addToLater = exports.getLaterVideos = void 0;
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const getLaterVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.watchlaterService.getLaterVideos(req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.getLaterVideos = getLaterVideos;
const addToLater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.watchlaterService.addToLater(req.params.videoId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.created(result);
});
exports.addToLater = addToLater;
const removeFromLater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.watchlaterService.removeLater(req.params.videoId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.removeFromLater = removeFromLater;
//# sourceMappingURL=watchlater.js.map