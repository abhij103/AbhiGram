import { Errback, NextFunction, Request, Response } from "express";
import { ObjectId } from 'mongodb';
import path from 'path';
import  { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import Post from "../models/post.model";
import { validationResult } from "express-validator";
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
                res.status(201).json({
                    message: 'Post created successfully!',
                    post: result
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

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.getAllPosts();
        res.status(200).json({
            message: 'Posts fetched successfully!',
            post: posts
        });
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}