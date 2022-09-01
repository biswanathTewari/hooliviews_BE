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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const models_1 = require("../models");
const signUp = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateUser)({ email: email, password: password });
        if (error)
            throw { status: 400, message: error.details[0].message };
        //~ Check if user already exists
        const user = yield models_1.User.findOne({ email: email });
        if (user)
            throw { status: 400, message: "User already exists." };
        //~ Create a new user
        const newUser = new models_1.User({ email: email, password: password });
        newUser.password = newUser.generateHash();
        //~ Save the new user
        yield newUser.save();
        //~ Send response
        const encodedToken = newUser.generateToken();
        const data = {
            user: lodash_1.default.pick(newUser, ["_id", "email"]),
            encodedToken,
        };
        return {
            success: true,
            data,
        };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateUser)({ email: email, password: password });
        if (error)
            throw { status: 400, message: error.details[0].message };
        //~ Check if user exists
        const user = yield models_1.User.findOne({ email: email });
        if (!user)
            throw { status: 400, message: "Invalid email or password." };
        //~ Check if password is correct
        const validPassword = user.validatePassword(password);
        if (!validPassword)
            throw { status: 400, message: "Invalid email or password." };
        //~ Send response
        const encodedToken = user.generateToken();
        const data = {
            user: lodash_1.default.pick(user, ["_id", "email"]),
            encodedToken,
        };
        return {
            success: true,
            data,
        };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
exports.default = {
    signUp,
    login,
};
//# sourceMappingURL=auth.service.js.map