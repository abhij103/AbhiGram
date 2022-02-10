import {Router} from 'express';
import { createUser, findUser, login } from '../controllers/auth.controller';
import { isAuthenticated, signUpChecker } from '../middlewares/auth.mw';

 const router = Router();

router.put('/signup',  signUpChecker, createUser);
router.post('/login', login);
router.get('/getuser',isAuthenticated,findUser);
 export {router as authRoutes};