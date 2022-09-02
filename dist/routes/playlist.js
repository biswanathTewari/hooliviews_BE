"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
router.get("/", middleware_1.auth, controllers_1.getPlaylists);
router.post("/", middleware_1.auth, controllers_1.createPlaylist);
router.delete("/:playlistId", middleware_1.auth, controllers_1.deletePlaylist);
router.get("/:playlistId/", middleware_1.auth, controllers_1.getPlaylist);
router.post("/:playlistId/:videoId", middleware_1.auth, controllers_1.addVideoToPlaylist);
router.delete("/:playlistId/:videoId", middleware_1.auth, controllers_1.deleteVideoFromPlaylist);
exports.default = router;
//# sourceMappingURL=playlist.js.map