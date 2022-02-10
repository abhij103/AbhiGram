import { Errback, NextFunction, Request, Response } from "express";
import { ObjectId } from 'mongodb';
import path from 'path';
import  { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import Post from "../models/post.model";
import { validationResult } from "express-validator";
import User from "../models/auth.model";
export const createPost = async (req: any, res: Response, next: NextFunction) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            throw { stausCode: 422, message: error.array({ onlyFirstError: true })[0].msg };
        }
        if (!req.files) {
            throw { stausCode: 422, message: 'No image provided.' };
        }
        const file = req.files.myFile as UploadedFile;
        const extensionName = path.extname(file.name); // fetch the file extension
        const allowedExtension = ['.png', '.jpg', '.jpeg'];
        if (!allowedExtension.includes(extensionName)) { // MIME TYPE VALIDATION
            throw { stausCode: 422, message: 'Invalid file type,only png,jpg,jpeg allowed' };
        }
        const fname = uuidv4();
        const folderPath = path.join(__dirname, '../', 'images', fname);
        file.mv(folderPath, async (err) => {
            if (err) {
                throw { stausCode: 422, message: 'Error occured while creating.' };
            } else {
                const title = req.body.title;
                const tame = new Date().toISOString();
                const fpath = 'images/' + fname;
               // const post = new Post(title, fpath, new ObjectId('507f1f77bcf86cd799439011'), tame, tame);
                const post = new Post(title, fpath, new ObjectId(req.userId), tame, tame);
                const result = await post.addPost();
                const user = await User.findUserById(new ObjectId(req.userId));
                const userPost = {...post,_id:result.insertedId.toString(),creator:{uid:user._id.toString(),email:user.email,
                    name:user.name,status:user.status
                    }};
                    console.log('up',userPost);
                res.status(201).json({
                    message: 'Post created successfully!',
                    post: userPost
                });
            }
        });
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

export const getAllPosts = async (req: any, res: Response, next: NextFunction) => {
    const currentPage = req.query.page || 1;
    try {
        const posts = await Post.getAllPostsDb(+currentPage);
        const allUserPosts =  await makeUserPosts(posts);
        res.status(200).json({
            message: 'Posts fetched successfully!',
            post: allUserPosts
        });
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
export const getUserPosts = async (req: any, res: Response, next: NextFunction) => {
    try {
       const posts = await Post.findUserPosts(new ObjectId(req.userId));
   const userPosts =  await makeUserPosts(posts);
        res.status(200).json({
            message: 'Posts fetched successfully!',
            post: userPosts
        });
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
const makeUserPosts = async(posts:any[]):Promise<any>=>{
    const postsWithUser = [];
    for(const post of posts){
      const user = await User.findUserById(post.creator);
      const newUser = {...post,creator:{uid:user._id.toString(),email:user.email,
      name:user.name,status:user.status
      }};
      postsWithUser.push(newUser);
    }
    return Promise.resolve(postsWithUser);
}
export const getPostsCount = async (req: any, res: Response, next: NextFunction) => {
    try {
       const posts = await Post.getTotalPostsCount();
       console.log('mah posts',posts);
        res.status(200).json({
           count:posts.length
        });
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}