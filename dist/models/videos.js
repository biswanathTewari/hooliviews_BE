"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVideo = exports.Video = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
//& Schema
const videoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    creator: { type: String, required: true },
    creatorImg: { type: String, required: true },
    duration: { type: String, required: true },
});
//& Model
const Video = (0, mongoose_1.model)("videos", videoSchema);
exports.Video = Video;
//& Validation
const validateVideo = (video) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        img: joi_1.default.string().required(),
        creator: joi_1.default.string().required(),
        creatorImg: joi_1.default.string().required(),
        duration: joi_1.default.string().required(),
    });
    return schema.validate(video);
};
exports.validateVideo = validateVideo;
//# sourceMappingURL=videos.js.map