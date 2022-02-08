import {Router} from 'express';
import { createUser, login } from '../controllers/auth.controller';
import { signUpChecker } from '../middlewares/auth.mw';

 const router = Router();

router.put('/signup',  signUpChecker, createUser);
router.post('/login', login);
 export {router as authRoutes};