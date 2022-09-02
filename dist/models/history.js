"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHistory = exports.History = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
//& Schema
const historySchema = new mongoose_1.Schema({
    video: { type: mongoose_1.Schema.Types.ObjectId, ref: "videos", required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "hooliusers", required: true },
});
//& Model
const History = (0, mongoose_1.model)("History", historySchema);
exports.History = History;
//& Validation
const validateHistory = (item) => {
    const schema = joi_1.default.object({
        video: joi_1.default.string().required(),
    });
    return schema.validate(item);
};
exports.validateHistory = validateHistory;
//# sourceMappingURL=history.js.map