"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlaylist = exports.Playlist = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
//& Schema
const playlistItem = new mongoose_1.Schema({
    video: { type: mongoose_1.Schema.Types.ObjectId, ref: "videos" },
});
const playlistSchema = new mongoose_1.Schema({
    videos: [playlistItem],
    title: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "hooliusers", required: true },
});
//& Model
const Playlist = (0, mongoose_1.model)("Playlist", playlistSchema);
exports.Playlist = Playlist;
//& Validation
const validatePlaylist = (playlist) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string(),
    });
    return schema.validate(playlist);
};
exports.validatePlaylist = validatePlaylist;
//# sourceMappingURL=playlist.js.map