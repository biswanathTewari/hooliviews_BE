"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
router.get("/", middleware_1.auth, controllers_1.getHistory);
router.post("/:videoId", middleware_1.auth, controllers_1.addHistory);
router.delete("/all", middleware_1.auth, controllers_1.clearHistory);
router.delete("/:videoId", middleware_1.auth, controllers_1.removeFromHistory);
exports.default = router;
//# sourceMappingURL=history.js.map