import {Router} from 'express';
import { createPost, getPosts } from '../controllers/post.controller';
import { createPostReqChecker } from '../middlewares/post.mw';
 const router = Router();

router.post('/create',createPostReqChecker,createPost);
router.get('/getposts',getPosts);
 export {router as postRoutes};
 // Renaming befor import.