"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
router.post("/signup", controllers_1.signUpUser);
router.post("/login", controllers_1.logInUser);
exports.default = router;
//# sourceMappingURL=auth.js.map