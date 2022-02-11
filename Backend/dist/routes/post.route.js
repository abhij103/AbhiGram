"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const auth_mw_1 = require("../middlewares/auth.mw");
const post_mw_1 = require("../middlewares/post.mw");
const router = (0, express_1.Router)();
exports.postRoutes = router;
router.post('/create', auth_mw_1.isAuthenticated, post_mw_1.createPostReqChecker, post_controller_1.createPost);
router.get('/userposts', auth_mw_1.isAuthenticated, post_controller_1.getUserPosts);
router.get('/count', auth_mw_1.isAuthenticated, post_controller_1.getPostsCount);
router.get('/all', auth_mw_1.isAuthenticated, post_controller_1.getAllPosts);
// Renaming befor import.
