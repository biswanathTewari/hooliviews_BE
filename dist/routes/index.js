"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlist = exports.history = exports.watchlater = exports.likes = exports.auth = exports.videos = void 0;
const videos_1 = __importDefault(require("./videos"));
exports.videos = videos_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.auth = auth_1.default;
const likes_1 = __importDefault(require("./likes"));
exports.likes = likes_1.default;
const watchlater_1 = __importDefault(require("./watchlater"));
exports.watchlater = watchlater_1.default;
const history_1 = __importDefault(require("./history"));
exports.history = history_1.default;
const playlist_1 = __importDefault(require("./playlist"));
exports.playlist = playlist_1.default;
//# sourceMappingURL=index.js.map