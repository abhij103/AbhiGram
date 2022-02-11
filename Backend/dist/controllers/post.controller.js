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
exports.getPostsCount = exports.getUserPosts = exports.getAllPosts = exports.createPost = void 0;
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const post_model_1 = __importDefault(require("../models/post.model"));
const express_validator_1 = require("express-validator");
const auth_model_1 = __importDefault(require("../models/auth.model"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            throw { stausCode: 422, message: error.array({ onlyFirstError: true })[0].msg };
        }
        if (!req.files) {
            throw { stausCode: 422, message: 'No image provided.' };
        }
        const file = req.files.myFile;
        const extensionName = path_1.default.extname(file.name); // fetch the file extension
        const allowedExtension = ['.png', '.jpg', '.jpeg'];
        if (!allowedExtension.includes(extensionName)) { // MIME TYPE VALIDATION
            throw { stausCode: 422, message: 'Invalid file type,only png,jpg,jpeg allowed' };
        }
        const fname = (0, uuid_1.v4)();
        const folderPath = path_1.default.join(__dirname, '../', 'images', fname);
        file.mv(folderPath, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                throw { stausCode: 422, message: 'Error occured while creating.' };
            }
            else {
                const title = req.body.title;
                const tame = new Date().toISOString();
                const fpath = 'images/' + fname;
                // const post = new Post(title, fpath, new ObjectId('507f1f77bcf86cd799439011'), tame, tame);
                const post = new post_model_1.default(title, fpath, new mongodb_1.ObjectId(req.userId), tame, tame);
                const result = yield post.addPost();
                const user = yield auth_model_1.default.findUserById(new mongodb_1.ObjectId(req.userId));
                const userPost = Object.assign(Object.assign({}, post), { _id: result.insertedId.toString(), creator: { uid: user._id.toString(), email: user.email,
                        name: user.name, status: user.status
                    } });
                res.status(201).json({
                    message: 'Post created successfully!',
                    post: userPost
                });
            }
        }));
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = req.query.page || 1;
    try {
        const posts = yield post_model_1.default.getAllPostsDb(+currentPage);
        const allUserPosts = yield makeUserPosts(posts);
        res.status(200).json({
            message: 'Posts fetched successfully!',
            post: allUserPosts
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.getAllPosts = getAllPosts;
const getUserPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.findUserPosts(new mongodb_1.ObjectId(req.userId));
        const userPosts = yield makeUserPosts(posts);
        res.status(200).json({
            message: 'Posts fetched successfully!',
            post: userPosts
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.getUserPosts = getUserPosts;
const makeUserPosts = (posts) => __awaiter(void 0, void 0, void 0, function* () {
    const postsWithUser = [];
    for (const post of posts) {
        const user = yield auth_model_1.default.findUserById(post.creator);
        const newUser = Object.assign(Object.assign({}, post), { creator: { uid: user._id.toString(), email: user.email,
                name: user.name, status: user.status
            } });
        postsWithUser.push(newUser);
    }
    return Promise.resolve(postsWithUser);
});
const getPostsCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.getTotalPostsCount();
        res.status(200).json({
            count: posts.length
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.getPostsCount = getPostsCount;
