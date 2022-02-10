import {Router} from 'express';
import { createPost, getAllPosts, getPostsCount, getUserPosts } from '../controllers/post.controller';
import { isAuthenticated } from '../middlewares/auth.mw';
import { createPostReqChecker } from '../middlewares/post.mw';
 const router = Router();

router.post('/create',isAuthenticated,createPostReqChecker,createPost);
router.get('/userposts',
isAuthenticated,
getUserPosts);
router.get('/count',isAuthenticated,
getPostsCount)
router.get('/all',isAuthenticated,getAllPosts);
 export {router as postRoutes};
 // Renaming befor import.