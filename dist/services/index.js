"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistService = exports.historyService = exports.watchlaterService = exports.likesService = exports.videosService = exports.authService = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
exports.authService = auth_service_1.default;
const videos_service_1 = __importDefault(require("./videos.service"));
exports.videosService = videos_service_1.default;
const likes_service_1 = __importDefault(require("./likes.service"));
exports.likesService = likes_service_1.default;
const watchlater_service_1 = __importDefault(require("./watchlater.service"));
exports.watchlaterService = watchlater_service_1.default;
const history_service_1 = __importDefault(require("./history.service"));
exports.historyService = history_service_1.default;
const playlist_service_1 = __importDefault(require("./playlist.service"));
exports.playlistService = playlist_service_1.default;
//# sourceMappingURL=index.js.map