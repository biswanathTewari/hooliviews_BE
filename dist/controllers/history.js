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
exports.clearHistory = exports.removeFromHistory = exports.addHistory = exports.getHistory = void 0;
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.historyService.getAllVideos(req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.getHistory = getHistory;
const addHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.historyService.addHistory(req.params.videoId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.created(result);
});
exports.addHistory = addHistory;
const removeFromHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.historyService.removeHistory(req.params.videoId, req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.removeFromHistory = removeFromHistory;
const clearHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.historyService.clearHistory(req.user._id);
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.clearHistory = clearHistory;
//# sourceMappingURL=history.js.map