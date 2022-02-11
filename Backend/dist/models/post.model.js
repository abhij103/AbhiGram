"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
class Post {
    constructor(title, imageUrl, creator, createdAt, updatedAt) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.creator = creator;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    addPost() {
        const db = (0, database_1.getDb)();
        return db
            .collection('posts')
            .insertOne(this);
    }
    static getAllPostsDb(pageNo) {
        const db = (0, database_1.getDb)();
        return db.collection('posts').find().skip((pageNo - 1) * 6).limit(6).toArray();
    }
    static getTotalPostsCount() {
        const db = (0, database_1.getDb)();
        return db.collection('posts').find().toArray();
    }
    //    updatePost(pid){
    //       const db = getDb();
    //       return db.collection('posts')
    //       .updateOne({ _id: pid }, { $set: this });
    //    }
    //   static getAllPosts(pageNo){
    //    const db = getDb();
    // return db.collection('posts').find().skip((pageNo-1)*2).limit(2).toArray()
    //      .then(products => {
    //        return products;
    //      })
    //      .catch(err => {
    //   })
    // }
    static findUserPosts(uid) {
        const db = (0, database_1.getDb)();
        return db
            .collection('posts')
            .find({ creator: uid }).toArray();
    }
}
exports.default = Post;
