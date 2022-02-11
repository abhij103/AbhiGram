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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.login = exports.createUser = void 0;
const express_validator_1 = require("express-validator");
const auth_model_1 = __importDefault(require("../models/auth.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw { statusCode: 422, message: errors.array({ onlyFirstError: true })[0].msg };
        }
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const hashedPw = yield bcryptjs_1.default.hash(password, 12);
        const user = new auth_model_1.default(email, hashedPw, name, 'I am new');
        const result = yield user.addUser();
        res.status(201).json({ message: 'User created!', userId: result.insertedId.toString() });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield auth_model_1.default.findUserByEmail(email);
        if (!user) {
            throw { statusCode: 401, message: 'A user with this email could not be found.' };
        }
        const areEqual = yield bcryptjs_1.default.compare(password, user.password);
        if (!areEqual) {
            throw { statusCode: 401, message: 'Wrong password' };
        }
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            userId: user._id.toString()
        }, 'somesupersecretsecret', { expiresIn: '1h' });
        res.status(200).json({ token: token, userId: user._id.toString() });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.login = login;
const findUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_model_1.default.findUserById(new mongodb_1.ObjectId(req.userId));
        const { password } = result, returnObj = __rest(result
        //CC Obj destructuring.
        , ["password"]);
        //CC Obj destructuring.
        res.status(200).json({ userInfo: returnObj });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.findUser = findUser;
