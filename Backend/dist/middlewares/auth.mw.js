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
exports.isAuthenticated = exports.signUpChecker = void 0;
const express_validator_1 = require("express-validator");
const auth_model_1 = __importDefault(require("../models/auth.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signUpChecker = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail({ gmail_remove_dots: false })
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield auth_model_1.default.findUserByEmail(value);
        if (user) {
            //     return Promise.reject({ stausCode: 422, message:'E-Mail address already exists!'});   
            return Promise.reject('E-Mail address already exists!');
        }
    })),
    (0, express_validator_1.body)('password').trim().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/),
    //CC not() & isEmpty() are also there body('name').trim().not().isEmpty(),
    (0, express_validator_1.body)('name').trim().isLength({ min: 3 })
];
const isAuthenticated = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        throw { statusCode: 401, message: 'No Auth Header Provided' };
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'somesupersecretsecret');
    }
    catch (err) {
        throw { statusCode: 500, message: 'Server error!' };
    }
    if (!decodedToken) {
        throw { statusCode: 401, message: 'Invalid token' };
    }
    req.userId = decodedToken.userId;
    next();
};
exports.isAuthenticated = isAuthenticated;
