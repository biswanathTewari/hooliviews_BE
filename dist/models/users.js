"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.User = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//& Schema
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        minlength: 3,
        maxlength: 25,
        match: /^\S+@\S+\.\S+$/,
        required: true,
    },
    password: {
        type: String,
        minlength: 3,
        required: true,
    },
});
//& Hashing
userSchema.methods.generateHash = function () {
    return bcrypt_1.default.hashSync(this.password, bcrypt_1.default.genSaltSync(8), null);
};
userSchema.methods.validatePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password); // req.body.password, hashed password
};
//& token
userSchema.methods.generateToken = function () {
    return jsonwebtoken_1.default.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
//& Model
const User = (0, mongoose_1.model)("hooliusers", userSchema);
exports.User = User;
//& Validation
const validateUser = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().min(3).max(25).required(),
        password: joi_1.default.string().min(3).max(25).required(),
    });
    return schema.validate(user);
};
exports.validateUser = validateUser;
//# sourceMappingURL=users.js.map