import { getDb } from "../utils/database";
import {ObjectId} from 'mongodb';
class Post{
    constructor(private title:string,
        private imageUrl:string, private creator:ObjectId , private createdAt:string , private updatedAt:string) {}
    

   addPost(): Promise<any>  {
    const db = getDb();
    return db
      .collection('posts')
      .insertOne(this)
   }
   static getAllPosts(){
       const db =getDb();
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
// static findUserPosts(uid){
//    const db = getDb();
//    return db
//      .collection('posts')
//      .find({ creator: uid }).toArray()
//      .then(posts => {
//        return posts;
//      })
//      .catch(err => {
//        console.log(err);
//      });
// }
// static findPostById(pid){
//    const db = getDb();
//    return db
//      .collection('posts')
//      .findOne({ _id: pid })
//      .then(post => {
//        return post;
//      })
//      .catch(err => {
//        console.log(err);
//      });
// }
}
export default Post;