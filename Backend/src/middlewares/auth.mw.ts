import { NextFunction, Request } from 'express';
import {body} from 'express-validator';
import User from '../models/auth.model';
import jwt from 'jsonwebtoken';
export const signUpChecker = [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail({gmail_remove_dots:false})
    .custom(async(value) => {
        const user = await User.findUserByEmail(value);
        if(user){
       //     return Promise.reject({ stausCode: 422, message:'E-Mail address already exists!'});   
           return Promise.reject('E-Mail address already exists!');
        }
    })
    
  ,
  body('password').trim().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/),
 //CC not() & isEmpty() are also there body('name').trim().not().isEmpty(),
 body('name').trim().isLength({min:3})
]

export const isAuthenticated = (req:any, res:any, next:any) => {
    const authHeader =  req.get('Authorization');
  if (!authHeader) {
    throw {statusCode:401,message:'No Auth Header Provided'};
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret') as any;
  } catch (err) {
    throw {statusCode:500,message:'Server error!'};
  }
  if (!decodedToken) {
    throw {statusCode:401,message:'Invalid token'};
  }
  req.userId = decodedToken.userId;
  next();
}