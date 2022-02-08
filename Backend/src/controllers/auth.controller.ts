import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/auth.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw { statusCode: 422, message: errors.array({ onlyFirstError: true })[0].msg };
        }
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const hashedPw = await  bcrypt.hash(password, 12);
        const user = new User(email,hashedPw,name,'I am new');
        const result = await user.addUser();
        res.status(201).json({ message: 'User created!', userId: result.insertedId.toString() });
        }catch(err:any){
            if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
        }
}

export const login = async (req:any, res:Response, next:NextFunction) => {
    try{
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findUserByEmail(email);
  if (!user) {
      throw { statusCode: 401, message: 'A user with this email could not be found.' };
    }
    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) {
      throw { statusCode: 401, message: 'Wrong password' };
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: user._id.toString() });
  }
  catch(err:any){
      if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
  }

};